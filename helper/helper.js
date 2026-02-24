const isExisted = (users, name, email="") => {
  const user = users.find((u) => u.name == name || u.email == email);
  if (user) {
    return user;
  }
};


const hasAWallet = (wallets, userId) => {
  const wallet = wallets.find((wallet) => wallet.userId == userId);
  if (wallet) return wallet;
};


module.exports = {
  isExisted,
  hasAWallet,
};


