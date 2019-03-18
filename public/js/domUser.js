const post = document.querySelector('.main--section-inputPost');
const addPost = document.querySelector('.main--section-add');
const publicPost = document.querySelector('#public');
const privatePost = document.querySelector('#private');
const msgPostvalidate = document.querySelector('.inputPost--validation');
const comment = document.querySelectorAll('.main--section-inputComment');
const addComment = document.querySelectorAll('.addComment');
const validationComment = document.querySelectorAll('.validationComment');
const postDelete = document.querySelectorAll('.main--section-postDelete');
const validatePostDelete = document.querySelectorAll('.validationDeletePost');
const commentDelete = document.querySelectorAll('.main--section-commentDelete');

commentDelete.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/deletecomment', {
      method: 'DELETE',
      body: JSON.stringify({ commentid: element.value }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => { window.location.href = '/'; })
      .catch(() => { validationComment[index].textContent = 'There is some error please try again'; });
  });
});

postDelete.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/deletepost', {
      method: 'DELETE',
      body: JSON.stringify({ postid: element.value }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => { window.location.href = '/'; })
      .catch(() => { validatePostDelete[index].textContent = 'There is some error please try again'; });
  });
});

addComment.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    const commentValue = comment[index].value;
    if (commentValue.trim().length === 0) {
      validationComment[index].textContent = 'Please add your comment';
      return false;
    }
    if (commentValue.search(/<[^>]*script/) !== -1) {
      validationComment[index].textContent = 'Please don\'t try add <script>';
      return false;
    }
    fetch('/addcomment', {
      method: 'POST',
      body: JSON.stringify({
        comment: commentValue,
        postid: element.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => { window.location.href = '/'; })
      .catch(() => {
        validationComment[index].textContent = 'There is some error please try again';
      });
    return true;
  });
});

addPost.addEventListener('click', (e) => {
  e.preventDefault();
  if (post.value.trim().length === 0) {
    msgPostvalidate.textContent = 'Please add your post';
    return false;
  }
  if (post.value.search(/<[^>]*script/) !== -1) {
    msgPostvalidate.textContent = 'Please don\'t try add <script>';
    return false;
  }
  if (!publicPost.checked && !privatePost.checked) {
    msgPostvalidate.textContent = 'Choose post privacy type';
    return false;
  }
  const dataPost = {
    post: post.value,
    privacy: true,
  };
  if (privatePost.checked) {
    dataPost.privacy = false;
  }
  fetch('/addpost', {
    method: 'POST',
    body: JSON.stringify(dataPost),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then((res) => {
      if (res.msg === 'private post added') {
        msgPostvalidate.textContent = 'Your post added in private post page';
      } else {
        window.location.href = '/';
      }
    })
    .catch(() => {
      msgPostvalidate.textContent = 'There is some error please try again';
    });
  return true;
});
