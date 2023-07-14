import dotenv from "dotenv";
import userService from "../services/user.service.js";
import Jwt from "jsonwebtoken";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(401);
    }

    const [Schema, token] = parts;
    if (Schema !== "Bearer") {
      return res.send(401);
    }

    Jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "token invalid!" });
      }
      console.log(decoded);

      const user = await userService.findByIdService(decoded.id);

      if (!user || !user.id) {
        return res.status(401).send({ message: "token invalid!" });
      }
  
      req.userId = user.id;
      next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
