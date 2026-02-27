const express = require("express");
const errorHandler = require("./moddleware/errorHandler");
const connectionDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});


connectionDb();
const app = express();
app.use(limiter);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contact", require("./routes/contactRouter"));
app.use("/api/user", require("./routes/userRouter"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
