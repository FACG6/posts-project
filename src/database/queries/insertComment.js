const connect = require('./../connection');

const addComment = (postid, userid, comment) => connect.query(`INSERT INTO
                                                                    comments (postId ,userId, comment)
                                                                VALUES
                                                                    ($1,$2,$3)
                                                                RETURNING
                                                                    commentId;`, [postid, userid, comment]);

module.exports = { addComment };
