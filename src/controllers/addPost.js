const { insertPost } = require('./../database/queries/insertPost');

exports.addNewPost = (request, response, next) => {
  if (request.user === false) {
    response.status(201).send({ msg: 'authentication failed' });
  } else {
    request.check('post').isLength({ min: 1 }).trim();
    request.check('privacy').isBoolean();
    const error = request.validationErrors();
    if (error) {
      response.status(201).send({ msg: 'validation Data Error' });
    } else {
      const { post, privacy } = request.body;
      const { userId } = request.user;
      insertPost(userId, post, privacy)
        .then((res) => {
          if (res.rowCount === 1) {
            if (privacy) {
              response.status(201).send({ msg: 'public post added' });
            } else {
              response.status(201).send({ msg: 'private post added' });
            }
          } else {
            response.status(201).send({ msg: 'No post added' });
          }
        })
        .catch(err => next(err));
    }
  }
};
