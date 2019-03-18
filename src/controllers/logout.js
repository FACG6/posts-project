exports.logoutUser = (request, response) => {
  response.clearCookie('jwt');
  response.redirect('/');
};
