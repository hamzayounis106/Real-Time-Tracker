import express from "express";
import { createServer } from "http";
import Server from "socket.io";
import path from "path";
const Port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);
app.set("view engine", "ejs");
// Set up CORS middleware

// Set up your routes and other middleware

server.listen(Port, () => {
  console.log("Server is running ");
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
