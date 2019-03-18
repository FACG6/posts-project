const { readFileSync } = require('fs');
const { join } = require('path');
const test = require('tape');
const request = require('supertest');
const buildDB = require('../src/database/dbBuild');
const app = require('../src/app');

const pathDB = join(__dirname, '..', 'src', 'database', 'db.sql');
const sql = readFileSync(pathDB).toString();

test('Request privatepost route without cookie', (t) => {
  request(app)
    .get('/privatepost')
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.text.includes('Redirecting to /'), true, 'Response redirct to home \'/\' (user without cookie)');
        t.end();
      }
    });
});

test('Request privatepost route with cookie', (t) => {
  request(app)
    .get('/privatepost')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        buildDB(sql);
        t.equal(res.text.includes('Home'), true, 'privatepost Page have button to got home');
        t.end();
      }
    });
});

test('Request deleteprivatepost route without cookie', (t) => {
  request(app)
    .delete('/deleteprivatepost')
    .send({ postid: 10 })
    .expect(302)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        buildDB(sql);
        t.equal(res.text.includes('Redirecting to /'), true, 'Response redirct to home \'/\' (user with cookie)');
        t.end();
      }
    });
});

test('Request deleteprivatepost route with cookie and try delete post not exist', (t) => {
  request(app)
    .delete('/deleteprivatepost')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({ postid: 10 })
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        buildDB(sql);
        t.equal(JSON.parse(res.text).msg, 'you try delete post not exist or not your own post', 'delete post not exist falied');
        t.end();
      }
    });
});

test('Request deleteprivatepost route with cookie and try delete post not own', (t) => {
  request(app)
    .delete('/deleteprivatepost')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({ postid: 2 })
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        buildDB(sql);
        t.equal(JSON.parse(res.text).msg, 'you try delete post not exist or not your own post', 'delete post not exist falied');
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));
