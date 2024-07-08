import express from "express";
import { createServer } from "http";
import Server from "socket.io";
import path from "path";

const app = express();
const server = createServer(app);
const io = new Server(server);
app.set("view engine", "ejs");
// Set up CORS middleware

// Set up your routes and other middleware

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
app.get("/", (req, res) => {
  res.render("index");
});
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("location", (data) => {
    // Broadcast the location to all users including the sender
    io.emit("sendLocationBack", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    // Notify all users about the disconnection
    io.emit("userDisconnected", socket.id);
  });
});