const connect = require('../connection');

const deletePost = (postid, userid) => connect.query(`DELETE FROM
                                                        posts
                                                    WHERE
                                                        postId=$1
                                                    AND
                                                        userID=$2
                                                    RETURNING
                                                        postId`, [postid, userid]);

module.exports = { deletePost };
