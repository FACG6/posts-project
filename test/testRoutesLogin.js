const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('Request login route without cookie', (t) => {
  request(app)
    .get('/login')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.type, 'text/html', 'Type of reponse from route /login should be text/html');
        t.equal(res.text.includes('Document'), true, 'Title of reponse html page includes Document');
        t.equal(res.text.includes('login'), true, 'Reponse html page includes login (only Guest can open this page');
        t.end();
      }
    });
});

test('Request login route (user try login with correct information) ', (t) => {
  request(app)
    .post('/login')
    .send({
      email: 'amin@gmail.com',
      password: '123',
    })
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        const headersCookie = res.headers['set-cookie'][0];
        t.equal(JSON.parse(res.text).msg, 'done', 'Login success');
        t.equal(headersCookie.includes('jwt', 'Max-Age=972592207'), true, 'Set-cookie success');
        t.end();
      }
    });
});

test('Request login route (user try login with fail information) ', (t) => {
  request(app)
    .post('/login')
    .send({
      email: 'amin123@gmail.com',
      password: '123',
    })
    .expect(201)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(JSON.parse(res.text).msg, 'Email or Password is wrong', 'Login fail');
        t.end();
      }
    });
});

test('Request login route when user have cookie', (t) => {
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

test.onFinish(() => process.exit(0));
