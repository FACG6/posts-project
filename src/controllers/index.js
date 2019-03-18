const express = require('express');
const { getHomePage } = require('./home');
const { getPrivatePostsPage, deletePrivatePost } = require('./privatePost');
const { getSignupPage, signupNewUser } = require('./signup');
const { getLoginPage, loginUser } = require('./login');
const { logoutUser } = require('./logout');
const { addNewPost } = require('./addPost');
const { addNewComment } = require('./addComment');
const { deletePublicPost } = require('./deletePost');
const { deleteCommentOnPublicPost } = require('./deleteComment');
const { auth } = require('./../middleware/authentication');

const router = express.Router();
router.use(auth);
router.get('/', getHomePage);
router.get('/privatepost', getPrivatePostsPage);
router.delete('/deleteprivatepost', deletePrivatePost);
router.post('/addpost', addNewPost);
router.post('/addcomment', addNewComment);
router.delete('/deletepost', deletePublicPost);
router.delete('/deletecomment', deleteCommentOnPublicPost);
router.get('/logout', logoutUser);
router.get('/signup', getSignupPage);
router.post('/signup', signupNewUser);
router.get('/login', getLoginPage);
router.post('/login', loginUser);

module.exports = { router };
