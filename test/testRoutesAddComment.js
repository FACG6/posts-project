const { readFileSync } = require('fs');
const { join } = require('path');
const test = require('tape');
const request = require('supertest');
const buildDB = require('../src/database/dbBuild');
const app = require('../src/app');

const pathDB = join(__dirname, '..', 'src', 'database', 'db.sql');
const sql = readFileSync(pathDB).toString();

test('Request addcomment route (NOt user try add comment in public post)', (t) => {
  request(app)
    .post('/addcomment')
    .send({
      comment: 'amin',
      postid: 1,
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'authentication failed', 'Add comment fialed');
        t.end();
      }
    });
});

test('Request addcomment route (NOt user try add comment in private post)', (t) => {
  request(app)
    .post('/addcomment')
    .send({
      comment: 'amin',
      postid: '2',
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'authentication failed', 'Add comment in private post fialed');
        t.end();
      }
    });
});

test('Request addcomment route (user try add comment in private post with validate information)', (t) => {
  request(app)
    .post('/addcomment')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({
      comment: 'amin',
      postid: '4',
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'You try add comment in private', 'Add comment in private post fialed');
        t.end();
      }
    });
});

test('Request addcomment route (user try add comment in private post without validate information)', (t) => {
  request(app)
    .post('/addcomment')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({
      comment: '',
      postid: '4',
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'validation Data Error', 'Add comment in private post fialed');
        t.end();
      }
    });
});

test('Request addcomment route (user try add comment in public post with validate information)', (t) => {
  request(app)
    .post('/addcomment')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({
      comment: 'amin',
      postid: '2',
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        buildDB(sql);
        t.equal(JSON.parse(res.text).msg, 'done', 'Add comment in private post fialed');
        t.end();
      }
    });
});

test('Request addcomment route (user try add comment in public post without validate information)', (t) => {
  request(app)
    .post('/addcomment')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({
      comment: '',
      postid: '2',
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'validation Data Error', 'Add comment in private post fialed');
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));
