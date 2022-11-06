const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
// app.use(
//   cors({
//     origin: "localhost",
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json);
app.listen(port, () => {
  console.log("listen on", port);
});
const { poolStart } = require("./database");
const authRouter = require("./routers/auth");
poolStart().then((res) => {
  console.log(res.rows[0]);
});
app.use("/auth", authRouter);
