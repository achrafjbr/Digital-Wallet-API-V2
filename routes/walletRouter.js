const walletRoute = require('express').Router();
const { deposit, withdraw, getAllWallets, getSingleWallet } = require('../controllers/walletController');

walletRoute.post('/deposit/:id', deposit);

walletRoute.post('/withdraw', withdraw);

walletRoute.get('/:id', getSingleWallet);

walletRoute.get('/', getAllWallets);



module.exports = {
    walletRoute
}