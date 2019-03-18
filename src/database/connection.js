const { Pool } = require('pg');
const url = require('url');
require('dotenv').config();

let DB_URL = process.env.DB;
if (process.env.NODE_ENV === 'dev') {
  DB_URL = process.env.DB;
} else if (process.env.NODE_ENV === 'pro') {
  DB_URL = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.HEROKU_POSTGRESQL_AQUA_URL;
}

const parmas = url.parse(DB_URL);
const [user, password] = parmas.auth.split(':');

const option = {
  host: parmas.hostname,
  port: parmas.port,
  user,
  password,
  database: parmas.path.split('/')[1],
  ssl: parmas.hostname !== 'localhost',
};

module.exports = new Pool(option);
