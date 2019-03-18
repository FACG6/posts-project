const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('Request logout page without cookie', (t) => {
  request(app)
    .get('/logout')
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

test('Request logout page with cookie', (t) => {
  request(app)
    .get('/logout')
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

test('Request logout page with fail cookie', (t) => {
  request(app)
    .get('/logout')
    .set('Cookie', ['jwt=1265185asfd1qaw841f68we1f'])
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
