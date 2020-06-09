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
}
