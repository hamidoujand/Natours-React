module.exports = class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  filter() {
    let queryObj = { ...this.queryString };
    let excludedArrays = ["sort", "limit", "page", "fields"];
    for (let key in queryObj) {
      if (excludedArrays.includes(key)) {
        delete queryObj[key];
      }
    }
    //2-Advanced Filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    );
    queryString = JSON.parse(queryString);
    this.mongooseQuery = this.mongooseQuery.find(queryString); //this is the first One so we save this as the "this.mongooseQuery"
    return this; //because we want to change
  }
  sort() {
    if (this.queryString.sort) {
      let sort = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sort); //because these methods returns new Query and updated version we assign then
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }
  fieldLimiting() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }
  paginate() {
    let page = this.queryString.page * 1 || 1;
    let limit = this.queryString.limit * 1 || 10;
    let skip = (page - 1) * limit;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
};
