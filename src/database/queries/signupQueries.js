const connect = require('../connection');

const checkEmailValidity = email => connect.query(`SELECT
                                                        email
                                                    FROM
                                                        users
                                                    WHERE
                                                        email = ($1);`, [email]);

const addNewUser = (name, email, password) => connect.query(`INSERT INTO
                                                                    users (name, email, password)
                                                                VALUES
                                                                    ($1, $2, $3)
                                                                RETURNING 
                                                                    userid;`, [name, email, password]);

module.exports = { checkEmailValidity, addNewUser };
