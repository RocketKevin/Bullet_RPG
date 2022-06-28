const express = require("express");
var PORT = process.env.PORT || 5000
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

app.use("/", express.static(path.join(__dirname)));
let ID = 0;
io.on("connection", (socket) => { 
    console.log("a user has connected to the server. New socket created.");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
    let playerID = ID++;
    let q = new queue();
    socket.on("server", function (obj) {
        q.insert(obj);
        socket.broadcast.emit("client", q.getFirst(playerID));
    })
    io.emit("chat message", "You are very good at sockets.")
})

class queue{//not a real queue since removing items from the queue takes linear time
    q;
    lastTime = 0;
    constructor(){
        this.q = [];
    }
    getFirst(playerID){//remove and return first item of queue
        let obj = this.q.shift();
        obj.playerID = playerID;
        return obj;
    }
    insert(obj){//add item to end of queue
        this.q.push(obj);
    }
}

server.listen(process.env.PORT || 5000, () => {
    console.log("listening on port 5000");
})

