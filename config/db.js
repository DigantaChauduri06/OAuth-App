const mongoose = require("mongoose");

const { connect } = mongoose;

const dbConnect = () => {
  connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((res) => console.log("DB connection successful"))
    .catch((e) => console.log("Error happened ", e));
}

module.exports = dbConnect;
