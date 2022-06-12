const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
