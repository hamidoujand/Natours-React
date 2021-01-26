let express = require("express");
let app = express();
let morgan = require("morgan");
let path = require("path");
let rateLimit = require("express-rate-limit");
let helmet = require("helmet");
let hpp = require("hpp");
let mongoSanitize = require("express-mongo-sanitize");
let xss = require("xss-clean");
let cookieParser = require("cookie-parser");
let compression = require("compression");
let cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, ".env") });

let tourRouter = require("./routes/tourRouter");
let userRouter = require("./routes/userRouter");
let reviewRouter = require("./routes/reviewRoutes");
let bookingRouter = require("./routes/bookingRoutes");

let AppError = require("./utils/AppError");
let errorController = require("./controllers/errorController");

//CORS
app.use(cors());

//OPTION
app.options("*", cors());
//Global middleware
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  //Middleware
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
//Data sanitization against NoSql injection
app.use(mongoSanitize());
//Data sanitization against XSS attacks
app.use(xss());

app.enable("trust proxy");

//Parameter Pollution
app.use(
  hpp({
    whitelist: ["duration", "ratingsQuantity", "ratingsAverage", "difficulty"],
  })
);

let limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP please try again in 1 hour",
});
app.use("/api", limiter);

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Compression
app.use(compression());

//Route Handlers
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);
//404 Route
app.all("*", (req, res, next) => {
  let err = new AppError(`Can't find route : "${req.originalUrl}"`, 404);
  next(err);
});

//Error Controller
app.use(errorController);

//Server
module.exports = app;
