require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const adminRouter = require("./routes/admin");
const customerRouter = require("./routes/customer");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/pub", customerRouter);
app.use("/", adminRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
