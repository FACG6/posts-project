const connect = require('../connection');

const deleteComent = commentid => connect.query(`DELETE FROM
                                                    comments
                                                WHERE
                                                    commentId=$1
                                                RETURNING
                                                    commentId`, [commentid]);

module.exports = { deleteComent };
