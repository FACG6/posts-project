const { getPostsPrivate } = require('./../database/queries/selectPostAndComments');
const { deletePost } = require('./../database/queries/deletePostAndHisComments');

exports.getPrivatePostsPage = (request, response, next) => {
  if (request.user) {
    const { userId, userName } = request.user;
    getPostsPrivate(userId)
      .then((res) => {
        if (res.rows) {
          response.render('privatePost', {
            dom: 'domPrivate', css: 'stylePrivate', ruesult: res.rows, userName,
          });
        }
      })
      .catch(err => next(err));
  } else {
    response.redirect('/');
  }
};

exports.deletePrivatePost = (request, response, next) => {
  if (request.user) {
    const { postid } = request.body;
    const { userId } = request.user;
    deletePost(postid, userId)
      .then((res) => {
        if (res.rowCount === 1) {
          response.send({ msg: 'done' });
        } else {
          response.send({ msg: 'you try delete post not exist or not your own post' });
        }
      })
      .catch(err => next(err));
  } else {
    response.redirect('/');
  }
};
