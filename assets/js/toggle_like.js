class ToggleLike {
    constructor(element){
        this.element= element;
        this.toggleLike();
    }

    toggleLike(){
        $(this.element).click(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type:"post",
                url: $(self).attr('href'),
                success: function(data){
                    var likeCount = parseInt($(self).attr('data-likes'));
                    if(data.data.deleted == true){
                        likeCount -= 1;
                        console.log("Like removed");
                    }
                    if(data.data.deleted == false){
                        likeCount += 1;
                        console.log("new like added");
                    }
                    
                    $(self).attr('data-likes', likeCount);
                    $(self).html(`${likeCount} Likes`); 
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }
}