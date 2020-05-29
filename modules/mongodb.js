// Configure Mongo DB
const MongoClient = require("mongodb").MongoClient;

exports.ObjectId = require("mongodb").ObjectID;
exports.mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });