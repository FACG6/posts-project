const { readFileSync } = require('fs');
const { join } = require('path');
const connection = require('./connection');

const pathDB = join(__dirname, 'db.sql');
const sql = readFileSync(pathDB).toString();

const bulitDB = file => connection.query(file);

bulitDB(sql)
  .then(() => true)
  .catch(err => console.log(err));

module.exports = bulitDB;
