import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).send({ message: "err.menssage" });
  }
};

const findAll = async (req, res) => {
  try{ const users = await userService.findAllService();
    if (users.length === 0) {
      return res.status(400).send({ menssage: "there are no registered users" });
    }
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: "err.menssage" });
  }
};

const findById = async (req, res) => {
  /*   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ menssage: "invalid Id" });
  } */

  try {  const user = req.user;
    if (!user) {
      return res.status(400).send({ menssage: "User not found" });
    }
    res.send(user);
  } catch (err) {
      res.status(500).send({ message: "err.menssage" });
    }
};

const update = async (req, res) => {
  try { const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send({ menssage: "submit all least one for update" });
    }
    const { id, user } = req;

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
  } catch(err){
    res.status(500).send({ message: "err.menssage" });
    }

};

export default { create, findAll, findById, update };
