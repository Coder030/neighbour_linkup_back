import prisma from "./db";
import { createJWT } from "./auth";

//sign up
export const createNewUser = async (req, res, next) => {
  const ifUser = await prisma.user.findUnique({
    where: {
      username: req.body.name,
    },
  });
  if (!ifUser) {
    try {
      //create user
      const user = await prisma.user.create({
        data: {
          username: req.body.name,
          password: req.body.password,
        },
      });
      //create token and make cookie
      const token = createJWT(user, res, req);

      res.json(user);
    } catch (e) {
      e.type = "input";
      next(e);
    }
  } else {
    res.json({ message: "same" });
  }
};
//sign in
export const signin = async (req, res) => {
  // find user
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.name,
      password: req.body.password,
    },
  });
  // change the value of cookie to new token
  if (!user) {
    res.json({ data: "nf" });
  } else {
    const token = createJWT(user, res, req);
    res.json({
      message: "A cookie named " + user.username + " has been found",
    });
  }
};
