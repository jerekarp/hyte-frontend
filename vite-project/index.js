import { fetchData } from './fetch.js';

// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const createUser = document.querySelector('.createuser');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();

  const url = 'http://localhost:3000/api/users';

  const form = document.querySelector('.create_user_form');

  // Tarkistetaan, onko form validi
  if (!form.checkValidity()) {
    form.reportValidity();
    return; // poistutaan funktiosta jos form ei ole validi
  }

  const password = form.querySelector('input[name=password]').value;
  const confirmPassword = form.querySelector('input[name=confirmPassword]').value;

  // Tarkistetaan, että salasanat ovat samat
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const username = form.querySelector('input[name=username]').value;

  const data = {
    username: username,
    password: password,
    email: form.querySelector('input[name=email]').value,
  };

  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  try {
    const responseData = await fetchData(url, options);
    const notification = document.getElementById('notificationUserCreated');
      notification.classList.add('show-notification');
      setTimeout(() => {
        notification.classList.remove('show-notification');
      }, 5500);
    form.reset();
  } catch (error) {
    console.error(error);
  }
});


document.addEventListener("DOMContentLoaded", function() {
  const showCreateForm = document.getElementById("showCreateForm");
  const showLoginForm = document.getElementById("showLoginForm");
  const createFormContainer = document.getElementById("createFormContainer");
  const loginFormContainer = document.querySelector(".form-container:not(#createFormContainer)");
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById('loginUsername');
  const passwordInput = document.getElementById('loginPassword');
  const authError = document.getElementById('authError');

  usernameInput.style.border = '';
  passwordInput.style.border = '';
  authError.innerText = '';

  showCreateForm.addEventListener("click", (event) => {
    event.preventDefault();
    createFormContainer.classList.remove("hidden");
    loginFormContainer.classList.add("hidden");
  });

  showLoginForm.addEventListener("click", (event) => {
    event.preventDefault();
    createFormContainer.classList.add("hidden");
    loginFormContainer.classList.remove("hidden");
  });

  // Lisätään tapahtumankäsittelijä koko lomakkeelle
  loginForm.addEventListener('click', (event) => {
    // Poistetaan punainen reunus ja virhesanoma
    usernameInput.style.border = '';
    passwordInput.style.border = '';
    authError.innerText = '';
  });
});



// haetaan nappi josta haetaan formi ja logataan sisään
// tästä saadaan TOKEN
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();

  const url = 'http://localhost:3000/api/auth/login';

  const form = document.querySelector('.login_form');

  const data = {
    username: form.querySelector('input[name=username]').value,
    password: form.querySelector('input[name=password]').value,
  };

  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    localStorage.setItem('token', data.token);
    document.getElementById('authError').innerText = '';
    if (data.token == undefined) {
      document.getElementById('loginUsername').classList.add('shake');
      document.getElementById('loginPassword').classList.add('shake');
      document.getElementById('loginUsername').style.border = '3px solid rgb(250, 3, 3)';
      document.getElementById('loginPassword').style.border = '3px solid rgb(250, 3, 3)';
      document.getElementById('authError').innerText = 'Invalid username or password';
      document.getElementById('authError').style.color = 'rgb(250, 3, 3)';

      setTimeout(() => {
        loginResponse.classList.remove('show-notification');
        document.getElementById('loginUsername').classList.remove('shake');
        document.getElementById('loginPassword').classList.remove('shake');
      }, 1800);
    } else {
      const loginResponse = document.getElementById('loginResponse');
      localStorage.setItem('user_level', data.user.user_level);
      localStorage.setItem('user_id', data.user.user_id),
      loginResponse.classList.add('show-notification');
      localStorage.setItem('name', data.user.username);
      setTimeout(function () {
        window.location.href = 'home.html';
      }, 2000);
    }
  });
});