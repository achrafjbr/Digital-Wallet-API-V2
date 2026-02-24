const { validationResult } = require("express-validation");
const { isExisted } = require("../helper/helper");

const { readJson, writeJson } = require("../utils/fileSystem");
const { genereateIds } = require("../utils/idsGenerator");

/**
 * @desc adding a user and creating his wallet in same time
 * @method POST
 * @access public
 * @route /api/users
 */
const register = (request, response) => {
  //const result = validationResult(request);
  //if (!result.isEmpty())return response.status(400).json({ errors: result.array() });
  const { name, email, password } = request.body;

  const data = readJson(response);
  const user = isExisted(data.users, name, email);
  if (user)
    return response.status(409).json({
      message: "User already existed",
    });

  // Adding user.
  data.users.push({
    userId: genereateIds(),
    name: name,
    email: email,
    password: password,
  });
  const { userId } = isExisted(data.users, name, email);
  // Creating a wallet for this user.
  data.wallets.push({
    walletId: genereateIds(),
    name: name,
    userId: userId,
    balance: 0
  });

  // Write new data, to the "data.json" file
  writeJson(response, data);

  return response.status(201).json({
    message: "Account has been created successfully.",
  });
};

/**
 * @desc Getting all users 
 * @method GET
 * @access public
 * @route /api/users
 */
const getAllUsers = (_, response) => {
  const users = readJson(response).users;
  if (!users) return response.status(404).json({ message: "No User found" });
  return response.status(200).json({ users: users });
};

/**
 * @desc Getting single user. 
 * @method GET
 * @access public
 * @route /api/users/id
 */
const getSingleUser = (request, response) => {
  const {
    params: { id },
  } = request;
  console.log(id);

  const user = readJson(response).users.find((u) => u.userId == id);
  if (!user) return response.status(404).json({ message: "No User found" });
  return response.status(200).json(user);
};

/**
 * @desc Updating user. 
 * @method PUT
 * @access public
 * @route /api/users/id
 */
const updateUser = (request, response) => {
  const {
    params: { id },
  } = request;
  const { body } = request;
  const data = readJson(response);
  const userIndex = data.users.findIndex((u) => u.userId == id);
  if (userIndex == -1)
    return response.status(404).json({ message: "No User found" });
  data.users[userIndex] = { ...data.users[userIndex], ...body };

  writeJson(response, data);
  return response.status(200).json(data.users[userIndex]);
};

/**
 * @desc Deleting user. 
 * @method DELETE
 * @access public
 * @route /api/users/id
 */
const deleteUser = (request, response) => {
  const {
    params: { id },
  } = request;

  const data = readJson(response);
  const user = data.users.find((u) => u.userId == id);
  console.log('USER INDEX', user)
  if (!user)
    return response.status(404).json({ message: "No User found" });
  // delete user 
  data.users = data.users.filter(u => u.userId != id);
  // delete his wallet : 
  data.wallets = data.wallets.filter(w => w.userId != id);

  writeJson(response, data);
  return response.status(200).json({
    message: "User has been removed successfully"
  });
};

module.exports = {
  register,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
