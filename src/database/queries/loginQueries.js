const connect = require('./../connection');

const getUserByEmail = email => connect.query(`SELECT
                                                    userId, name, email, password
                                                FROM
                                                    users
                                                WHERE
                                                    email = ($1);`, [email]);

module.exports = { getUserByEmail };
