const { readFileSync } = require('fs');
const { join } = require('path');
const test = require('tape');
const request = require('supertest');
const buildDB = require('../src/database/dbBuild');
const app = require('../src/app');

const pathDB = join(__dirname, '..', 'src', 'database', 'db.sql');
const sql = readFileSync(pathDB).toString();

test('Request deletepost route (Not user try delete public post)', (t) => {
  request(app)
    .delete('/deletepost')
    .send({ postid: 1 })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'authentication failed', 'Delete public post fialed');
        t.end();
      }
    });
});

test('Request deletepost route (user try delete not own public post)', (t) => {
  request(app)
    .delete('/deletepost')
    .send({ postid: 1 })
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'you try delete post not exist or not your own post', 'Delete public post fialed');
        t.end();
      }
    });
});

test('Request deletepost route (user try delete not exist public post)', (t) => {
  request(app)
    .delete('/deletepost')
    .send({ postid: 10 })
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'you try delete post not exist or not your own post', 'Delete public post fialed');
        t.end();
      }
    });
});

test('Request deletepost route (user try delete exist and own  public post)', (t) => {
  request(app)
    .delete('/deletepost')
    .send({ postid: 4 })
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        buildDB(sql);
        t.equal(JSON.parse(res.text).msg, 'done', 'Delete public post fialed');
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));
