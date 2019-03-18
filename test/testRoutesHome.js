const test = require('tape');
const request = require('supertest');
const app = require('../src/app');

test('Request home route without cookie', (t) => {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.type, 'text/html', 'Type of reponse from route / should be text/html');
        t.equal(res.text.includes('Document'), true, 'Title of reponse html page includes Document');
        t.equal(res.text.includes('login'), true, 'Reponse html page includes login (without cookie)');
        t.end();
      }
    });
});

test('Request home route when user have cookie', (t) => {
  request(app)
    .get('/')
    .set('Cookie', ['jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJOYW1lIjoiYW1pbiIsImlhdCI6MTU1MjU5MTA5Nn0.bkMCApiMoHrbjOloXA62zT_L_kTwnUpK0hSBuDA52D0'])
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        t.equal(res.type, 'text/html', 'Type of reponse from route / should be text/html');
        t.equal(res.text.includes('Document'), true, 'Title of reponse html page includes Document');
        t.equal(res.text.includes('class="header--nav-userName"'), true, 'Reponse html page includes UserName (user with cookie)');
        t.equal(res.text.includes('Add Your Comment'), true, 'Reponse html page includes Add Your Comment (user with cookie)');
        t.equal(res.text.includes('Logout'), true, 'Reponse html page includes logout (user with cookie)');
        t.end();
      }
    });
});

test.onFinish(() => process.exit(0));
