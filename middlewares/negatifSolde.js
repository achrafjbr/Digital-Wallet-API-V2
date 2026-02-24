const isNegatifSolde = (request, response, next) => {
  const {
    body: { balance },
  } = request;
  console.log("Check balance", balance);
  if (balance <= 0) {
    return response.status(412).json({
      message: "Sold must be Greather than 0.",
    });
  } else {
    next();
  }
};

module.exports = isNegatifSolde;
