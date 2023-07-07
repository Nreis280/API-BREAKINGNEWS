const { unsubscribe } = require("../routes/user.route");
const userService = require("../services/user.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ menssage: "submit all fields for registration" });
  }

  const user = await userService.createService(req.body);
  if (!user) {
    return res.status(400).send({ message: "Error createng User" });
  }

  res.status(201).send({
    menssage: "user created successfully",
    user: {
      id: user._id,
      name,
      username,
      email,
      password,
      avatar,
      background,
    },
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAllService();
  if (users.length === 0) {
    return res.status(400).send({ menssage: "there are no registered users" });
  }
  res.send(users);
};

const findById = async (req, res) => {

/*   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ menssage: "invalid Id" });
  } */

  const user = req.user;
  if (!user) {
    return res.status(400).send({ menssage: "User not found" });
  }
  res.send(user);
};

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name && !username && !email && !password && !avatar && !background) {
    res.status(400).send({ menssage: "submit all least one for update" });
  }
  const {id, user} = req;

  await userService.updateService(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  res.send({ message: "User sucessfully update!" });
};

module.exports = { create, findAll, findById, update };
