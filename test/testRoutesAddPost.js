const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('Request addpost route (NOt user try add public post)', (t) => {
  request(app)
    .post('/addpost')
    .send({
      post: 'amin',
      privacy: true,
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'authentication failed', 'Add public post fialed');
        t.end();
      }
    });
});

test('Request addpost route (NOt user try add private post)', (t) => {
  request(app)
    .post('/addpost')
    .send({
      post: 'amin',
      privacy: false,
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'authentication failed', 'Add private post fialed');
        t.end();
      }
    });
});

test('Request addpost route (user try add public post with validate information)', (t) => {
  request(app)
    .post('/addpost')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({
      post: 'amin',
      privacy: true,
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'public post added', 'Add public post success');
        t.end();
      }
    });
});

test('Request addpost route (user try add private post with validate information)', (t) => {
  request(app)
    .post('/addpost')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({
      post: 'amin',
      privacy: false,
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'private post added', 'Add private post success');
        t.end();
      }
    });
});

test('Request addpost route (user try add private post without validate information)', (t) => {
  request(app)
    .post('/addpost')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({
      post: '',
      privacy: false,
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'validation Data Error', 'Add private post success');
        t.end();
      }
    });
});

test('Request addpost route (user try add public post without validate information)', (t) => {
  request(app)
    .post('/addpost')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .send({
      post: '',
      privacy: true,
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'validation Data Error', 'Add public post success');
        t.end();
      }
    });
});


test.onFinish(() => process.exit(0));
