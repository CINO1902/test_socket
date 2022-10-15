const express = require("express");
var { createServer } = require("http");
//const port = process.env.PORT || 3000;

var { Server } = require("socket.io");


const app = express();
const httpserver = createServer(app);
const io = new Server(httpserver);


app.route('/').get((req,res)=>{
    res.json('hello, you are here')
})
io.on("connection", (socket) => {
    socket.join("annonymous")
  console.log("conneted");
//   console.log(socket.id, "has joined");
//   socket.on("signin", (id) => {
//     console.log(id);
//     console.log(clients);
//   });
  socket.on("message", (msg) => {
    console.log("msg", msg);
    io.to("annonymous").emit("sendmsgserver", {... msg, type:"otherMsg"})
    // socket.emit("sendmsgserver", {... msg, type:"otherMsg"})

    // let targetId = msg.targetId;
    // if (clients[targetId]) clients[targetId].emit("message", msg);
  });
});

//httpserver.listen(3000)
httpserver.listen(3000, "0.0.0.0", () => {
  console.log("server started");
});