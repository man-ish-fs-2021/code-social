class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect("http://localhost:5000");

        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;
        this.socket.on('connect', function () {
            // console.log("connection with the socket has been established");
            self.socket.emit("join_room",{
                email: self.userEmail,
                chatroom: "code-social"
            });
            self.socket.on("user_joined",function(data){
                // console.log("user has joined:", data);  
            });
        });
       
        $('#send-message').on('click', function (e) {
            e.preventDefault();
            let message = $('#chat-message-input').val();
            if (message != '') {
                $("#chat-message-input").val('');
                self.socket.emit('send_message', {
                    message: message,
                    email: self.userEmail,
                    chatroom:"code-social"

                });
            }
        });
        self.socket.on("recieved_message",function(data){
            // console.log("recieved some message",data);
            let newMessage = $("<li>");
            let message_type = 'other-message';
            if(data.email == self.userEmail){
                message_type = "self-message";
            }
            newMessage.addClass(message_type);
            newMessage.append($("<span>",{
                html: data.message
            }));
            newMessage.append($("<br>"));
            newMessage.append($("<small>",{
                html: data.email
            }));
            $("#chat-messages-list").append(newMessage);
        });
    }
}