const { getPosts, getComments } = require('../database/queries/selectPostAndComments');

exports.getHomePage = (request, response, next) => {
  getPosts()
    .then((res) => {
      const fetchesCommenst = [];
      res.rows.forEach((element) => {
        const elementClone = { ...element };
        fetchesCommenst.push(getComments(element.postid)
          .then((resComments) => {
            elementClone.comments = resComments.rows;
            return elementClone;
          }));
      });
      return Promise.all(fetchesCommenst);
    })
    .then((res) => {
      if (!request.user) {
        response.render('home', {
          css: 'style', ruesult: res,
        });
      } else {
        const { userId, userName } = request.user;
        response.render('home', {
          css: 'style', ruesult: res, secndryDom: 'domUser', userName, userId,
        });
      }
    })
    .catch(err => next(err));
};
