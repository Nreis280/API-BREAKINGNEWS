const userService = require("../services/user.service");

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ menssage: "submit all fields for registration" });
  }

  const user = await userService.create(req.body);
  if (user) {
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

module.exports = { create };
