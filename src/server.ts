import express from "express";
import cors from "cors";
import router from "./router";
import cookieParser from "cookie-parser";
import { protect } from "./auth";
import prisma from "./db";
import http from "http";
import { createNewUser, signin } from "./user";

export const app = express();
const corsOptions = {
  credentials: true,
  origin: [
    // 'https://quizzify-genius.vercel.app',
    "http://localhost:3000",
    "http://localhost:3001",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());

//don't look at this
app.get("/", (req, res) => {
  console.log("hello from express!");
  res.json({ message: "this is GET /" });
});

//this is the main things
app.use(cookieParser());

//protected routes for frontend
app.use("/api", protect, router);

//these are for log/sign in
app.post("/make_cookie", createNewUser);
app.post("/get_cookie", signin);
export const server = http.createServer(app);
const port = process.env.PORT || 2000;

server.listen(port, () => {
  console.log(`Server for socket listening on ${port}`);
});
import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: [
      // 'https://quizzify-genius.vercel.app',
      "http://localhost:3000",
      "http://localhost:3001",
    ],
  },
});
const report = io.of("/report");
report.on("connection", async (socket) => {
  console.log("a user connected");
  socket.on(
    "post",
    async (title, summary, details, img, madeBy, userId, lat, long) => {
      const post = await prisma.post.create({
        data: {
          title: title,
          summary: summary,
          details: details,
          img: img,
          madeBy: madeBy,
          userId: userId,
          Lat: lat,
          Long: long,
        },
      });
    },
  );
  socket.on("give", async () => {
    const posts = await prisma.post.findMany();
    socket.emit("posts", posts);
  });
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});
