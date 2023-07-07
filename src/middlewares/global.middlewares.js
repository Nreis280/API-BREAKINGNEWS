const mongoose = require("mongoose");
const userService = require("../services/user.service");

const validId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ menssage: "invalid Id" });
  }

  next();
};

const validUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await userService.findByIdService(id);

  if (!user) {
    return res.status(400).send({ menssage: "User not found" });
  }
req.id = id
req.user = user

  next();
};

module.exports = { validId, validUser };
