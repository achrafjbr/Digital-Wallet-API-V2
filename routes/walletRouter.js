
const walletRoute = require("express").Router();
const {
  deposit,
  withdraw,
  getAllWallets,
  getSingleWallet,
  updateWallet,
  deleteWallet,
  filterByBanlance,
  getSpecificWallets
} = require("../controllers/walletController");

const isNegatifSolde = require("../middlewares/negatifSolde");

walletRoute.get("/", getAllWallets);

walletRoute.get("/search", filterByBanlance);

walletRoute.get("/paging", getSpecificWallets);

walletRoute.post("/deposit/:id", isNegatifSolde, deposit);

walletRoute.post("/withdraw/:id", withdraw);

walletRoute.get("/:id", getSingleWallet);

walletRoute.put("/:id", updateWallet);

walletRoute.delete("/:id", deleteWallet);


module.exports = walletRoute;
