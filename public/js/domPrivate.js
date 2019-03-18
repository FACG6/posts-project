const deletePost = document.querySelectorAll('.main--section-postDelete');
const validationDeletePost = document.querySelector('.validationDeletePost');
deletePost.forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/deleteprivatepost', {
      method: 'DELETE',
      body: JSON.stringify({ postid: element.value }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => { window.location.href = '/privatepost'; })
      .catch(() => { validationDeletePost.textContent = 'There is some error please try again'; });
  });
});
