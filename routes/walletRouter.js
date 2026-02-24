const walletRoute = require("express").Router();
const {
  deposit,
  withdraw,
  getAllWallets,
  getSingleWallet,
  updateWallet,
  deleteWallet,
} = require("../controllers/walletController");

const isNegatifSolde = require("../middlewares/negatifSolde");

walletRoute.post("/deposit/:id", isNegatifSolde, deposit);

walletRoute.post("/withdraw", withdraw);

walletRoute.get("/:id", getSingleWallet);

walletRoute.get("/", getAllWallets);

walletRoute.put("/:id", updateWallet);

walletRoute.delete("/:id", deleteWallet);

module.exports = walletRoute;
