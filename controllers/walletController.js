const { formatedDate } = require("../../FinTech/utilities/formatedDate");
const { isExisted, hasAWallet } = require("../helper/helper");

const { genereateIds } = require("../utils/idsGenerator");
const { fromJson, toJson } = require("../utils/serialization");
const { readJson, writeJson } = require("../utils/fileSystem");

/**
 * @desc Adding balance into a targeted wallet
 * @method POST
 * @access public
 * @route /api/transactions/userId
 */
const deposit = (request, response) => {
  const { balance, email, name } = request.body;
  const {
    params: { id },
  } = request;

  // Reading data from file "data.json".
  const data = readJson(response);

  const user = isExisted(data.users, name);
  console.log("user", user);
  if (user) {
    const wallet = hasAWallet(data.wallets, user.userId);
    wallet.balance += +balance;

    // Adding historique
    data.historics.push({
      historicId: genereateIds(),
      deposit: balance,
      name: name,
      userId: id,
      date: formatedDate(),
    });

    writeJson(response, data);
    return response.status(201).json({
      message: "Deposit has been added successfully",
    });
  } else {
    return response.status(404).json({
      message: "User not existed",
    });
  }
};

/**
 * @desc withdraw balance from  wallet
 * @method POST
 * @access public
 * @route /api/transactions/userId
 */
const withdraw = (request, response) => {
  console.log("Withdraw");

  const { balance, email, name } = request.body;
  const {
    params: { id },
  } = request;

  // Reading data from file "data.json".
  const data = readJson(response);

  const user = isExisted(data.wallets, name);
  console.log("user", user);
  if (user) {
    const wallet = hasAWallet(data.wallets, user.userId);
    if (balance > wallet.balance && wallet.balance > 0) {
      return response.status(401).json({
        message: `Insufficient balance, Your balance is:, ${wallet.balance}`,
      });
    } else {
      // update sold
      wallet.balance -= balance;

      // Adding historique
      data.historics.push({
        historicId: genereateIds(),
        withrawal: balance,
        name: name,
        userId: id,
        date: formatedDate(),
      });

      writeJson(response, data);
      return response.status(201).json({
        message: "Widthdraw has been added successfully",
      });
    }
  } else {
    return response.status(404).json({
      message: "User not existed",
    });
  }
};

/**
 * @desc Getting all existed wallets
 * @method GET
 * @access public
 * @route /api/transactions
 */
const getAllWallets = (request, response) => {
  const wallets = readJson(response).wallets;
  if (!wallets)
    return response.status(404).json({ message: "No Wallet found" });
  return response.status(200).json({ wallets: wallets });
};

/**
 * @desc Getting a single wallet
 * @method GET
 * @access public
 * @route /api/transactions/userId
 */
const getSingleWallet = (request, response) => {
  const {
    params: { id },
  } = request;

  const data = readJson(response);
  const wallet = data.wallets.find((w) => w.walletId == id);
  if (!wallet)
    return response.status(404).json({
      message: "NO wallet found",
    });

  return response.status(200).json(wallet);
};

/**
 * @desc Updating wallet
 * @method PUT
 * @access public
 * @route /api/transactions/userId
 */
const updateWallet = (request, response) => {
  const { body } = request;
  const {
    params: { id },
  } = request;
  const data = readJson(response);

  const walletIndex = data.wallets.findIndex((walt) => walt.userId == id);
  if (walletIndex == -1)
    return response.status(200).json({
      message: "Wallet Not found",
    });

  data.wallets[walletIndex] = { ...data.wallets[walletIndex], ...body };
  writeJson(response, data);
  return response.status(200).json(data.wallets[walletIndex]);
};

const deleteWallet = (request, response) => {
  const {
    params: { id },
  } = request;

  const data = readJson(response);
  const wallet = data.wallets.find((w) => w.userId == id);
  if (!wallet) return response.status(404).json({ message: "No Wallet found" });

  // delete his wallet :
  data.wallets = data.wallets.filter((w) => w.userId != id);

  // delete user
  data.users = data.users.filter((u) => u.userId != id);

  writeJson(response, data);
  return response.status(200).json({
    message: "Wallet has been removed successfully",
  });
};

const filterByBanlance = (request, response) => {
  const balance = request.query.balance;

  const data = readJson(response);

  const wallets = data.wallets.filter((w) => w.balance == balance);
  console.log(data.wallets);
  if (wallets.length == 0)
    return response.status(404).json({
      wallets: data.wallets,
    });

  return response.status(200).json(wallets);

  // Reading data from file "data.json".
  // const data = readJson(response);
};

module.exports = {
  deposit,
  withdraw,
  getAllWallets,
  getSingleWallet,
  updateWallet,
  deleteWallet,
  filterByBanlance,
};
