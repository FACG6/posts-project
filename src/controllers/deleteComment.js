const { deleteComent } = require('./../database/queries/deleteComments');

exports.deleteCommentOnPublicPost = (request, response, next) => {
  if (request.user === false) {
    response.status(201).send({ msg: 'authentication failed' });
  } else {
    request.check('commentid').isNumeric();
    const error = request.validationErrors();
    if (error) {
      response.status(201).send({ msg: 'validation Data Error' });
    } else {
      const { commentid } = request.body;
      deleteComent(commentid)
        .then((res) => {
          if (res.rowCount === 1) {
            response.status(201).send({ msg: 'done' });
          } else {
            response.status(201).send({ msg: 'you try delete comment not exist or not your own comment' });
          }
        })
        .catch(err => next(err));
    }
  }
};
