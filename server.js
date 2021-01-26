let app = require("./app");
let mongoose = require("mongoose");
let path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
let PORT = process.env.PORT || 3000;

(async function () {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("DB in The House!");
  } catch (err) {
    process.exit(1);
  }
})();

let server = app.listen(PORT, "127.0.0.1", () =>
  console.log(`Server on PORT ${PORT}`)
);

//for all promise rejections
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Received ... shutting down gracefully");
  server.close(() => {
    console.log("process terminated");
  });
});
