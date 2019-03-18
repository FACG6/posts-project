const login = document.querySelector('.main--section-login');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const loginStatus = document.querySelector('.main--section-validateUser');

login.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then((res) => {
      if (res.msg === 'done') {
        window.location.href = '/';
      } else {
        loginStatus.textContent = res.msg;
      }
    })
    .catch(() => {
      document.createTextNode = 'There is some error please try again';
    });
});
