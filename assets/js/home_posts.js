{
    // method to submit the form data using AJAX
    let createPost = function(){
        let newPostForm = $("#new-post-form");
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                    new PostComments(data.data.post._id);
                    deletePost($(" .delete-post-button",newPost));

                    new Noty({
                      theme: 'relax',
                      text: "Post created",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();    
                  
                },
                error: function(error){
                    console.log(error.responseText);
                } 

            });
        });
    }
    // method to display the form using AJAX
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
          <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        
          <p>
            ${post.content}  
          <br>
            ${post.user.name}  
          </p>
         
          <div id="post-comments">
            <form action="/comments/create" method="POST">
              <input type="text" name="content">
              <input type="hidden" name="post" value="${post._id}">
              <input type="submit" value="ADD comment">
            </form>
          </div>
          <div id="post-comments-list">
            <ul id="post-commets-${post._id}">
            </ul>
          </div>
        </li>`);
    }


    // method to delete posts
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id} `).remove();

                    new Noty({
                      theme: 'relax',
                      text: "Post Deleted",
                      type: 'success',
                      layout: 'topRight',
                      timeout: 1500
                      
                  }).show();    
                },error: function(error){
                    console.log(error.responseText);
                }

            })
        })
    }
    // method to create comments asynchronously
    let covertPostsToAjax = function(){
      $("#posts-list-container>ul>li").each(function(){
        // iterating over the posts created before to make them dynamic i.e. Ajax
        let self = this;
        
        let deleteButton = $(" .delete-post-button",$(self));
        deletePost(deleteButton);


        let postId = $(self).prop('id').split("-")[1];
        new PostComments(postId);
      });
    }

    
    createPost();
    covertPostsToAjax();
    
}