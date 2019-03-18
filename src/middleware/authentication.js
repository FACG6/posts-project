const { verify } = require('jsonwebtoken');

const verifykCookie = (cookie, secret) => new Promise((resolve, reject) => {
  verify(cookie, secret, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded);
  });
});

const auth = (req, res, next) => {
  if (req.cookies.jwt) {
    verifykCookie(req.cookies.jwt, process.env.SECRET)
      .then((decoded) => {
        if (decoded) {
          req.user = decoded;
          next();
        }
      })
      .catch(() => {
        res.clearCookie('jwt');
        res.redirect('/');
      });
  } else {
    req.user = false;
    next();
  }
};

module.exports = { auth };
