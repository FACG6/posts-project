// function for selector any element
const querySelectors = (selectorsName, enterTypeofQuery) => {
  if (selectorsName.length !== enterTypeofQuery.length) return false;
  const elements = {};
  enterTypeofQuery.map(
    (e, i) => {
      elements[selectorsName[i]] = document.querySelector(e);
      return '';
    },
  );
  return elements;
};

const {
  form,
  userName,
  validationMsgUserName,
  checkIconUserName,
  email,
  checkIconEmail,
  vaildationEmail,
  password,
  passwordMeterColor,
  vaildationPasswordText,
  validationMsgPassword,
  confirmPassword,
  validation,
} = querySelectors(
  ['form',
    'userName',
    'validationMsgUserName',
    'checkIconUserName',
    'email',
    'checkIconEmail',
    'vaildationEmail',
    'password',
    'passwordMeterColor',
    'vaildationPasswordText',
    'validationMsgPassword',
    'confirmPassword',
    'validation',
  ],
  ['.main--section-form',
    '#userName',
    '#vaildationUserName',
    '.checkUsedispatchEventr',
    '#email',
    '.checkEmadispatchEventil',
    '#vaildatidispatchEventonEmail',
    '#passworddispatchEvent',
    '.passworddispatchEventMeterColor',
    '#vaildatidispatchEventonMeterPasswordText',
    '#vaildatidispatchEventonPassword',
    '#confirmPdispatchEventassword',
    '#vaildatidispatchEventon',
  ],
);

email.addEventListener('input', () => {
  if (email.value.length === 0) {
    checkIconEmail.classList.remove('fa-check');
    vaildationEmail.style.color = 'black';
    vaildationEmail.textContent = '';
    return false;
  }
  if ((/^[\w.-_%+]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(email.value))) {
    vaildationEmail.textContent = 'done';
    vaildationEmail.style.color = 'green';
    checkIconEmail.style.color = 'green';
    checkIconEmail.classList.add('fa-check');
    return true;
  }
  checkIconEmail.classList.remove('fa-check');
  vaildationEmail.style.color = 'black';
  vaildationEmail.textContent = 'Email must be like example@example.com';
  return false;
});

confirmPassword.addEventListener('input', () => {
  if (confirmPassword.value.length === 0) {
    confirmPassword.style.borderBottom = 'none';
    return false;
  }
  if (confirmPassword.value !== password.value) {
    confirmPassword.style.borderBottom = '5px solid red';
    return false;
  }
  confirmPassword.style.borderBottom = '5px solid green';
  return true;
});

password.addEventListener('input', () => {
  const eventConfirmPassword = new InputEvent('input');
  confirmPassword.dispatchEvent(eventConfirmPassword);
  if (password.value.length === 0) {
    passwordMeterColor.style.background = 'gray';
    validationMsgPassword.textContent = '';
    vaildationPasswordText.textContent = '';
    return false;
  }
  if (password.value.length < 8) {
    passwordMeterColor.style.background = 'red';
    validationMsgPassword.textContent = 'Please Password must be more than 8 character';
    vaildationPasswordText.textContent = 'Week';
    passwordMeterColor.style.width = '33.33%';
    return false;
  }
  if (password.value.length < 12) {
    passwordMeterColor.style.background = 'orange';
    validationMsgPassword.textContent = '';
    vaildationPasswordText.textContent = 'good';
    passwordMeterColor.style.width = '66.66%';
    return false;
  }
  passwordMeterColor.style.background = 'green';
  validationMsgPassword.textContent = '';
  vaildationPasswordText.textContent = 'strong';
  passwordMeterColor.style.width = '100%';
  return true;
});

userName.addEventListener('input', () => {
  validationMsgUserName.textContent = '';
  if (userName.value.length === 0) {
    validationMsgUserName.textContent = '';
    return false;
  }
  if (userName.value.includes(' ')) {
    validationMsgUserName.textContent = 'Please no spase in Username';
    validationMsgUserName.style.color = 'red';
    return false;
  }
  if (userName.value.length < 6) {
    validationMsgUserName.textContent = 'Please Username must be more than 5 character';
    validationMsgUserName.style.color = 'red';
    return false;
  }
  validationMsgUserName.textContent = 'Done';
  checkIconUserName.classList.add('fa-check');
  validationMsgUserName.style.color = 'green';
  checkIconUserName.style.color = 'green';
  return true;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!userName.value && userName.value.includes(' ') && userName.value.length < 6) {
    validation.textContent = 'check the validation for field';
    return false;
  }
  if (confirmPassword.value !== password.value) {
    validation.textContent = 'check the validation for field';
    return false;
  }
  if (password.value.length < 8) {
    validation.textContent = 'check the validation for field';
    return false;
  }
  fetch('/signup', {
    method: 'POST',
    body: JSON.stringify({
      userName: userName.value,
      email: email.value,
      password: password.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then((ress) => {
      if (ress.msg === 'done') {
        window.location.href = '/';
      } else {
        validation.textContent = ress.msg;
      }
    })
    .catch(() => {
      validation.textContent = 'There is some error please try again';
    });
  return true;
});
