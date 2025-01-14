const express = require("express");
const errorHandler = require("./moddleware/errorHandler");
const connectionDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectionDb();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contact", require("./routes/contactRouter"));
app.use("/api/user", require("./routes/userRouter"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
