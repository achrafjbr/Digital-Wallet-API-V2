const express = require("express");
const { query, body } = require("express-validation");
const app = express();
const userRoute = require("./routes/userRouter");
const walletRoute = require("./routes/walletRouter");
process.config;
//const port = 3000;

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/transactions", walletRoute);

app.use((error, request, response) => {
  return response.status(404).json({
    message: error.message,
  });
});



// Server.
app.listen(3000, () => {
  console.log(`Server running at http://localhost:${3000}`);
});
