const { compare } = require('bcrypt');
const { createCookie } = require('./../utillity/createCookies');
const { getUserByEmail } = require('./../database/queries/loginQueries');

exports.getLoginPage = (request, response) => {
  if (request.user !== false) {
    response.redirect('/');
  } else {
    response.render('login', { dom: 'domLogin', css: 'stulyLogin' });
  }
};

exports.loginUser = (request, response, next) => {
  const { email, password } = request.body;
  let user;
  getUserByEmail(email)
    .then((res) => {
      if (res.rowCount !== 1) {
        return false;
      }
      [user] = res.rows;
      return compare(password, user.password);
    })
    .then((res) => {
      if (res) {
        const token = createCookie(user.userid, user.name);
        response.cookie('jwt', token, { maxAge: 972592207599, httpOnly: true });
        response.status(201).send({ msg: 'done' });
      } else {
        response.status(201).send({ msg: 'Email or Password is wrong' });
      }
    })
    .catch(err => next(err));
};
