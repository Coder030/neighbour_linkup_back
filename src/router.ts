import { Router } from "express";
import prisma from "./db";
import { Server } from "socket.io";
import { server } from "./server";

const router = Router();

router.get("/me", async (req, res) => {
  console.log("hey! no probs man!");
  // @ts-ignore
  console.log({ message: req.user });

  // @ts-ignore
  res.json({ data: req.user });
});
// router.get("/post", async(req,res) => {
//   const title = req.body.title
// })

export default router;
