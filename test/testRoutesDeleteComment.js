const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('Request deletecomment route (NOt user try delete comment in public post)', (t) => {
  request(app)
    .delete('/deletecomment')
    .send({ commentid: 1 })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'authentication failed', 'Delete comment fialed');
        t.end();
      }
    });
});

test('Request deletecomment route (user try delete comment in public post)', (t) => {
  request(app)
    .delete('/deletecomment')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({ commentid: 1 })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'done', 'Add comment fialed');
        t.end();
      }
    });
});

test('Request deletecomment route (user try delete not validation comment in public post)', (t) => {
  request(app)
    .delete('/deletecomment')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({ commentid: 10 })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'you try delete comment not exist or not your own comment', 'Add comment fialed');
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));
