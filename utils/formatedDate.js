const formatedDate = () => {
  const d = new Date();
  const date = d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear();
  return date;
};

module.exports = {
  formatedDate,
};
