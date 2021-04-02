module.exports.chatSocket = function (socketServer) {
    let io = require("socket.io")(socketServer,{cors: {
        origin: '*',
      }});

    io.sockets.on('connection',function(socket){
        console.log("user connected",socket.id);
        socket.on('disconnect',()=>{
            console.log("user disconnected");
        });
        socket.on("join_room",function(data){
            // console.log("request to join room",data);

            socket.join(data.chatroom);
            io.in(data.chatroom).emit("user_joined",data);

        });
        socket.on("send_message",function(data){
            io.in(data.chatroom).emit("recieved_message",data);
        });
    });
}