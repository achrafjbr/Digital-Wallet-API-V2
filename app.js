const express = require("express");
const { query } = require("express-validation");
const app = express();
const userRoute = require("./routes/userRouter");
const port = 3000;


app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
