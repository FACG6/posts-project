const { deletePost } = require('../database/queries/deletePostAndHisComments');

exports.deletePublicPost = (request, response, next) => {
  if (request.user === false) {
    response.status(201).send({ msg: 'authentication failed' });
  } else {
    request.check('postid').isNumeric();
    const error = request.validationErrors();
    if (error) {
      response.status(201).send({ msg: 'validation Data Error' });
    } else {
      const { postid } = request.body;
      const { userId } = request.user;
      deletePost(postid, userId)
        .then((res) => {
          if (res.rowCount === 1) {
            response.status(201).send({ msg: 'done' });
          } else {
            response.status(201).send({ msg: 'you try delete post not exist or not your own post' });
          }
        })
        .catch(err => next(err));
    }
  }
};
