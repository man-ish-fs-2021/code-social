{
    let toggleFriendship = function(){
        let friendshipForm = $("#friendship-form");
        friendshipForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url : $(this).attr('action'),
                success: function(data){
                    if(data.data.isFriends == true){
                        $(".friends-button").attr('value',"Remove-friend");
                    }
                    if(data.data.isFriends == false){
                        $(".friends-button").attr('value',"Add-friend");
                    }
                },error: function(error){
                    console.log(error.responseText);
                }
            })

        })
    }
    toggleFriendship();
}