const http = require("http");
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const createAdapter = require("@socket.io/redis-adapter").createAdapter;
const redis = require("redis");
require("dotenv").config();
const { createClient } = redis;
const { connectDB } = require("./db");
const { onJoin } = require("./services/onJoin");
const Messages = require("./utils/messages");
const Users = require("./utils/users");
const Boards = require("./utils/board");
const { onChatMessage } = require("./services/onChatMessage");
const { onDisconnect } = require("./services/onDisconnect");
const { onPixelAdded } = require("./services/onPixelAdded");
const { port } = require("./utils/constants");
const { errorHandler } = require("./utils/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  }
});

let db;
let users;
let messages;
let boards;

(async () => {
  let pubClient = createClient({ url: "redis://127.0.0.1:6379" });
  await pubClient.connect();
  let subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));
  db = await connectDB();
  users = new Users(db);
  messages = new Messages(db);
  boards = new Boards(db);


  // Run when client connects
  io.on("connection", async (socket) => {
    socket.on("joinRoom", await onJoin(socket, users, messages, boards));
    socket.on("chatMessage", await onChatMessage(socket, users, messages));
    socket.on("pixelAdded", await onPixelAdded(socket, users, boards));
    socket.on("disconnect", await onDisconnect(socket, users, messages));
  });

  app.get("/", (req, res) => {
    res.send("Chat Server is running.");
  });

  app.get("/board", async (req, res) => {
    const board = await boards.getBoard();
    res.json(board);
  });

  app.post("/board/pixel", errorHandler(async (req, res) => {
    const { x, y, color } = req.body;
    await boards.addPixel(x, y, color);
    res.status(201).json({ success: true });
  }));

})();

server.listen(port, () => console.log(`Server running on port ${port}`));

process.on("SIGINT", async () => {
  console.log("CLEANING UP");
  await users.disconnectAll();
  process.exit();
});

process.on("SIGTERM", async () => {
  console.log("CLEANING UP");
  await users.disconnectAll();
  process.exit();
});

