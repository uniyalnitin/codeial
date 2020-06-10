{
  function createPost() {
    let newPostForm = $("#new-post-form");

    // submit the post data
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          const newPost = appendToDom(data.data.post);
          $(newPost).prependTo("#post-list > ul");
          deletePost($(" .post-delete-button", newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });

    // render the newly create post in DOM
  }

  function appendToDom(post) {
    return $(`<li id="post-${post._id}">
      <a class="post-delete-button" href="/posts/delete/${post._id}">X</a> &emsp;
      ${post.contents}
      <br />
      
      <form action="/comments/create" method="POST" class="add-comment-form">
        <input type="text" placeholder="Enter comment.." name="content" />
        <input type="hidden" name="post_id" value="${post._id}" />
        <button type="submit">Comment</button>
    </li>`);
  }

  function deleteLinkHandler(that) {
    console.log($(that).prop("href"));
    $.ajax({
      type: "get",
      url: $(that).prop("href"),
      success: function (data) {
        console.log(data.data.post_id);
        $(`#post-${data.data.post_id}`).remove();
        console.log("Successfully deleted the post");
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  }

  function deletePost(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      deleteLinkHandler(deleteLink);
    });
  }
  createPost();

  $(".post-delete-button").click(function (e) {
    e.preventDefault();
    deleteLinkHandler(this);
  });

  function createComment(){
    $(".new-comment-form").submit(function (e) { 
      e.preventDefault();
      let div = $(this).prev();
      const that = $(this);

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: that.serialize(),
        success: function (data) {
          const newComment = appendToDomComment(data.data.comment, data.data.user)
          div.prepend(newComment);
          $(" .delete-comment-link", newComment).click(function(e){
            e.preventDefault();
            deleteComment(this);
          })
        },
        error: function(error){
          console.log(error.responseText);
        }
      });
    });
  }

  function appendToDomComment(comment, user){
    return $(`<div id="comment-${comment._id}">
              <a class="delete-comment-link" href="/comments/delete/${comment._id}">X</a>
              <p class="comment-text">${comment.content}</p>
              <small>by ${user} </small>
          </div>`);
  }

  createComment();

  function deleteComment(deleteLink){
      console.log(deleteLink);
      $.ajax({
        type:"get",
        url: $(deleteLink).prop("href"),
        success: function(data){
          $(`#comment-${data.data.comment_id}`).remove();
        },
        error: function(error){
          console.log(error.responseText);
        }
    })
  }

  $(".delete-comment-link").click(function(e){
    e.preventDefault();
    deleteComment(this);
  });
}
