const { formatedDate } = require("../../FinTech/utilities/formatedDate");
const { isExisted, hasAWallet } = require("../helper/helper");
const { genereateIds } = require("../utils/idsGenerator");
const { fromJson } = require("../utils/serialization");

/**
 * @desc Adding balance into a targeted wallet  
 * @method POST
 * @access public
 * @route /api/transactions/userId
 */
const deposit = (request, response) => {
    const { balance, email, name } = fromJson(request.body);
    const { id } = request.params.id;

    // Reading data from file "data.json".
    const data = readJson(response);

    if (isNegatifSolde(balance)) {
        response.writeHead(412, "Precondition Failed");
        return response.status(412).json({
            message: "Sold must be Greather than 0."
        });
    }
    const user = isExisted(data.users, name);
    if (user) {
        const wallet = hasAWallet(data.wallets, user.userId);
        if (wallet) {
            wallet.balance += +balance;
            // New deposit.
            //data.wallets.push();
            writeJson(response, data);
        } else {
            // First deposit.
            data.wallets.push({
                walletId: genereateIds(),
                name: name,
                userId: id,
                balance: balance,
            });
        }


        // Adding historique
        data.historics.push({
            historicId: genereateIds(),
            deposit: balance,
            name: name,
            userId: id,
            date: formatedDate(),
        });

        writeJson(response, data);
        response.writeHead(201, "Ok");
        return response.status(201).json({
            message: "Deposit has been added successfully",
        });
    } else {
        response.writeHead(404, "Not found");
        return response.status(404).json({
            message: "User not existed"
        });
    }
}

/**
 * @desc withdraw balance from  wallet  
 * @method POST
 * @access public
 * @route /api/transactions/userId
 */
const withdraw = (request, response) => {
    const { balance, email, name } = fromJson(request.body);
    const { id } = request.params.id;

    // Reading data from file "data.json".
    const data = readJson(response);

    if (isNegatifSolde(balance)) {
        response.writeHead(412, "Precondition Failed");
        return response.status(404).json({
            message: "Sold must be Greather than 0."
        });
    }
    const wallet = hasAWallet(data.wallets, id);

    if (wallet) {
        if (balance > wallet.balance && wallet.balance > 0) {
            response.writeHead(401, "Unauthorized");
            return response.status(401).json({
                message: `Insufficient balance, Your balance is:, ${wallet.balance}`
            });
        } else {
            // update sold
            wallet.balance -= +balance;
            // Adding historique
            data.historics.push({
                historicId: genereateIds(),
                withrawal: balance,
                name: name,
                userId: id,
                date: formatedDate(),
            });

            writeJson(response, data);
            response.writeHead(200, "Ok");
            return response.status(201).json({
                message: "Widthdraw has been added successfully"
            });
        }
    } else {
        response.writeHead(404, "Not found");
        return response.end("User not existed");
    }


}

/**
 * @desc Getting all existed wallets  
 * @method GET
 * @access public
 * @route /api/transactions
 */
const getAllWallets = (_, response) => {
    const wallets = readJson(response).wallets;
    if (!wallets) return response.status(404).json({ message: "No Wallet found" });
    return response.status(200).json({ wallets: wallets });
}

/**
 * @desc Getting a single wallet  
 * @method GET
 * @access public
 * @route /api/transactions/userId
 */
const getSingleWallet = (request, response) => {
    const { id } = request.params.id;
    const wallets = readJson(response).wallets;
    const wallet = wallets.find(w => w.userId == id);
    if (wallet) return response.status(404).json({
        message: 'NO Wallet found'
    });

    return response.status(200).json(wallet);
}


module.exports = {
    deposit,
    withdraw,
    getAllWallets,
    getSingleWallet
}