const { hash } = require('bcrypt');
const { checkEmailValidity, addNewUser } = require('./../database/queries/signupQueries');
const { createCookie } = require('./../utillity/createCookies');

exports.getSignupPage = (request, response) => {
  if (request.user !== false) {
    response.redirect('/');
  } else {
    response.render('signup', { dom: 'domSignup', css: 'stulySignup' });
  }
};

exports.signupNewUser = (request, response, next) => {
  request.check('email').isEmail();
  request.check('userName').isLength({ min: 6 });
  request.check('password').isLength({ min: 8 });
  const error = request.validationErrors();
  if (error) {
    response.status(201).send({ msg: 'validation Data Error' });
  } else {
    const { userName, email, password } = request.body;
    checkEmailValidity(email)
      .then((res) => {
        if (res.rowCount === 0) {
          hash(password, 5)
            .then(hashPassword => addNewUser(userName, email, hashPassword))
            .then(userId => createCookie(userId.rows[0].userid, userName))
            .then((token) => {
              response.cookie('jwt', token, { maxAge: 972592207599, httpOnly: true });
              response.status(201).send({ msg: 'done' });
            })
            .catch(err => next(err));
        } else {
          response.status(201).send({ msg: 'Email already exist' });
        }
      })
      .catch(err => next(err));
  }
};
