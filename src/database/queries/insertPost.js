const connect = require('./../connection');

const insertPost = (userId, post, privacy) => connect.query(`INSERT INTO
                                                                 posts (userId, post, postType)
                                                             VALUES
                                                                 ($1,$2,$3)
                                                             RETURNING
                                                                 postId;`, [userId, post, privacy]);

module.exports = { insertPost };
