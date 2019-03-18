const { addComment } = require('./../database/queries/insertComment');
const { getPostPublic } = require('./../database/queries/selectPostAndComments');

exports.addNewComment = (request, response, next) => {
  if (request.user === false) {
    response.status(201).send({ msg: 'authentication failed' });
  } else {
    request.check('comment').isLength({ min: 1 }).trim();
    request.check('postid').isNumeric();
    const error = request.validationErrors();
    if (error) {
      response.status(201).send({ msg: 'validation Data Error' });
    } else {
      const { comment, postid } = request.body;
      const { userId } = request.user;
      getPostPublic(postid)
        .then((res) => {
          if (res.rowCount === 1) {
            return true;
          }
          return false;
        })
        .then((res) => {
          if (res === false) {
            response.status(201).send({ msg: 'You try add comment in private' });
          } else {
            addComment(postid, userId, comment)
              .then((ress) => {
                if (ress.rowCount === 1) {
                  response.status(201).send({ msg: 'done' });
                } else {
                  response.status(201).send({ msg: 'Not Done' });
                }
              })
              .catch(err => next(err));
          }
        })
        .catch(err => next(err));
    }
  }
};
