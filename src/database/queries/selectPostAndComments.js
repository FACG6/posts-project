const connect = require('../connection');

const getPosts = () => connect.query(`SELECT
                                          posts.*, users.name, users.userid
                                      FROM
                                          posts
                                      INNER JOIN
                                          users on users.userid = posts.userid
                                      WHERE
                                          posts.postType = true
                                      ORDER BY
                                          posts.postId desc;`);
const getPostsPrivate = userId => connect.query(`SELECT
                                                    *
                                                FROM
                                                    posts
                                                WHERE
                                                    userId = $1
                                                ORDER BY
                                                    postId desc;`, [userId]);

const getPostPublic = postId => connect.query(`SELECT
                                                    *
                                                FROM
                                                    posts
                                                WHERE
                                                    postId=$1
                                                AND
                                                    posttype = true`, [postId]);

const getComments = postId => connect.query(`SELECT
                                                * from comments
                                             INNER JOIN
                                                 users on users.userid = comments.userid
                                             WHERE
                                                 postId = $1
                                             ORDER BY
                                                 comments.commentId;`, [postId]);

module.exports = {
  getPosts,
  getComments,
  getPostsPrivate,
  getPostPublic,
};
