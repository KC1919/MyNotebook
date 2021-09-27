const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

require("dotenv").config();

app.use(express.json());


const connectToMongoDb = require("./db");

connectToMongoDb();

app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.listen(process.env.port || 5000, () => {
  console.log("server started on port 3000");
});
