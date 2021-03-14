class PostComments{

    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComments(postId);

        let self = this;

        $(" .delete-comment-button",this.postContainer).each(function(){
            self.deleteComment($(this));
        })
       
    }

    createComments(postId){
        let Pself = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type: "post",
                url: "/comments/create",
                data: $(self).serialize(),
                success : 
                    function(data){
                        let newComment = Pself.newCommentDom(data.data.comment);
                        $(`#post-comments-${postId}`).prepend(newComment);
                        Pself.deleteComment(" .delete-comment-button",newComment);  
                        
                        new Noty({
                            theme: 'relax',
                            text: "Comment created",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();    
                },error: 
                    function(error){
                        console.log(error.responseText);
                    }
                
            });
        });
    }

    newCommentDom = function(comment){
        return $(`<li id="comment-${comment._id}">
          <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
        <p>
          ${comment.content}
          <br>
          <small>
            ${comment.user.name}
          </small>
        </p>
      </li>`);
    }

    deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: "get",
                url: $(deleteLink).prop("href"),
                success: function(data){
                   $(`#comment-${data.data.comment_id}`).remove();


                   new Noty({
                    theme: 'relax',
                    text: "Comment deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();    
                }, error : function(error){
                    console.log(error.responseText);
                }
            });
        });

    }
}