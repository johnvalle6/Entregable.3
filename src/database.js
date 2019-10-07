const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose
  .connect("mongodb+srv://johnvalle829:jjres@cluster0-nqbyq.mongodb.net/test", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));
