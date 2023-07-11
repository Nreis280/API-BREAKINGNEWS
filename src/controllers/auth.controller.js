import bcrypt, { compareSync } from "bcrypt";
import { loginService, generateToken } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if(!user){
      return res.status(404).send({message: "Invalid! User or Password not found"})
    }

    const passwordValid = bcrypt.compareSync(password, user.password);

    if(!passwordValid){
      return res.status(404).send({message: "Invalid! User or Password not found"})}
    

    const token =  generateToken(user.id)

    res.send({token});
    console.log(passwordValid)
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default { login };
