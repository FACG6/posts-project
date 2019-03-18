const { readFileSync } = require('fs');
const { join } = require('path');
const test = require('tape');
const request = require('supertest');
const buildDB = require('../src/database/dbBuild');
const app = require('../src/app');

const pathDB = join(__dirname, '..', 'src', 'database', 'db.sql');
const sql = readFileSync(pathDB).toString();


test('Request signup page without cookie', (t) => {
  request(app)
    .get('/signup')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.type, 'text/html', 'Type of reponse from route /signup should be text/html');
        t.equal(res.text.includes('Document'), true, 'Title of reponse html page includes Document');
        t.equal(res.text.includes('confirmPassword'), true, 'Reponse html page includes confirmPassword (only Guest can open this page');
        t.end();
      }
    });
});

test('Request signup page when user have cookie', (t) => {
  request(app)
    .get('/login')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.headers.location, '/', 'Response redirct to home \'/\' (user with cookie)');
        t.equal(res.text.includes('Redirecting to /'), true, 'Response redirct to home \'/\' (user with cookie)');
        t.end();
      }
    });
});

test('Request signup page (user try signup with validate information) ', (t) => {
  request(app)
    .post('/signup')
    .send({
      userName: 'aminamin',
      email: 'amin12@gmail.com',
      password: '12345678',
    })
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        buildDB(sql);
        const headersCookie = res.headers['set-cookie'][0];
        t.equal(JSON.parse(res.text).msg, 'done', 'Signup success');
        t.equal(headersCookie.includes('jwt', 'Max-Age=972592207'), true, 'Set-cookie success');
        t.end();
      }
    });
});

test('Request signup page (user try signup with email already have account) ', (t) => {
  request(app)
    .post('/signup')
    .send({
      userName: 'aminamin',
      email: 'amin@gmail.com',
      password: '12345678',
    })
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'Email already exist', 'Signup fail');
        t.end();
      }
    });
});

test('Request signup page (user try signup with not validate Email) ', (t) => {
  request(app)
    .post('/signup')
    .send({
      userName: 'aminamin',
      email: 'asfdawf',
      password: '12345678',
    })
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'validation Data Error', 'Signup fail (email not validate)');
        t.end();
      }
    });
});

test('Request signup page (user try signup with not validate username (must 6 characters or more)) ', (t) => {
  request(app)
    .post('/signup')
    .send({
      userName: 'amin',
      email: 'amin@gmail.com',
      password: '12345678',
    })
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'validation Data Error', 'Signup fail (username not validate)');
        t.end();
      }
    });
});

test('Request signup page (user try signup with not validate password (must 8 characters or more)) ', (t) => {
  request(app)
    .post('/signup')
    .send({
      userName: 'aminamin',
      email: 'amin@gmail.com',
      password: '123',
    })
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'validation Data Error', 'Signup fail (password not validate)');
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));
