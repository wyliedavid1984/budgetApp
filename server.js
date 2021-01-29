const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
// port for server to run on 
const PORT = process.env.PORT || 3000;

const app = express();
//middleware
app.use(express.static("public"));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
//Data base connection
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/budget", {
    useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
});
// routes
app.use(require("./routes/api.js"));
//listening for server port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});