import jwt from "jsonwebtoken";

//create token and cookie
export const createJWT = (user: any, res, req) => {
  // make a cookie signed by JWT_SECRET
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
  );

  //make cookie with name - "token" so I can get the value easily and expires in 3 days
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30 * 6 * 1000, // 6 months
    sameSite: "none",
    secure: true, // Set to false when not using HTTPS (localhost development)
    path: "/",
  });

  return token;
};
export const protect = (req, res, next) => {
  // find the token

  const token = req.cookies["token"];

  try {
    // verify if there is a token like that or not

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (e) {
    console.log("hey");

    console.log(e + "   this is the error!");

    res.json({ message: "nvt" });

    return;
  }
};
