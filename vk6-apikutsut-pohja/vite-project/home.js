import { fetchData } from '/fetch.js';

const bt1 = document.querySelector('.get_entry');
bt1.addEventListener('click', async () => {
    console.log('toimiii');
    const url = "http://127.0.0.1:3000/api/entries/1";

    fetchData(url).then((data) => {
        // käsitellään dataa fetchDATA funktiosta tullut JSON
        console.log(data);
    });
});

// haetaan kaikki käyttäjät ja luodaan niistä taulukko

const allButton = document.querySelector('.get_users');
allButton.addEventListener('click', getUsers);

async function getUsers() {
  const url = 'http://localhost:3000/api/users';
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };
  fetchData(url, options).then((data) => {
    createTable(data);
  });

  // vaihtoehtoinen tapa 2

  //try {
    //const responseData = await fetchData(url, options);
   // console.log(responseData);
  //} catch (error) {
    //console.error(error);
  //}
}

function createTable(data) {
  console.log(data);

  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';

  data.forEach(element => {
    console.log(element.username);

    // Luodaan jokaiselle riville ensin TR elementti alkuun
    const tr = document.createElement('tr');

    // Luodaan soluja mihin tiedot
    const td1 = document.createElement('td');
    td1.innerText = element.username;

    const td2 = document.createElement('td');
    td2.innerText = element.user_level;

    // staattiseen luontiin
    //const td3 = document.createElement('td');
    //td3.innerHTML = `<button class="check" data-id="${element.user_id}">Info</button>`;

    const td3 = document.createElement('td');
    const button1 = document.createElement('button');
    button1.className = 'check';
    button1.setAttribute('data-id', element.user_id);
    button1.innerText = 'Info';
    td3.appendChild(button1);

    button1.addEventListener('click', getUser);

    // td4
    const td4 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.className = 'del';
    button2.setAttribute('data-id', element.user_id);
    button2.innerText = 'Delete';
    td4.appendChild(button2);

    // 2. Lisää kuuntelija kun taulukko on tehty
    button2.addEventListener('click', deleteUser);

    // td5
    const td5 = document.createElement('td');
    td5.innerText = element.user_id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);

  });
}

// Haetaan dialogi yksittäisille tiedoille
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const dialog = document.querySelector('.info_dialog');
const closeButton = document.querySelector('.info_dialog button');
// "Close" button closes the dialog
closeButton.addEventListener('click', () => {
  dialog.close();
});

async function getUser(evt) {
  // haetaan data-attribuutin avulla id, tämä nopea tapa
  const id = evt.target.attributes['data-id'].value;
  console.log('Getting individual data for ID:', id);
  const url = `http://127.0.0.1:3000/api/users/${id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    // Avaa modaali
    dialog.showModal();
    console.log('in modal');
    dialog.querySelector('p').innerHTML = `
          <div>User ID: <span>${data.user_id}</span></div>
          <div>User Name: <span>${data.username}</span></div>
          <div>Email: <span>${data.email}</span></div>
          <div>Role: <span>${data.user_level}</span></div>
    `;
  });
}

async function deleteUser(evt) {
  console.log('Deletoit tietoa');

  // Tapa 1 - haetaan arvo tutkimalla eventtiä
  const id = evt.target.attributes['data-id'].value;

  // Tapa 2 - haetaan ''viereinen'' elementti
  const id2 = evt.target.parentElement.nextElementSibling.textContent;

  const url = `http://127.0.0.1:3000/api/users/${id}`
  let token = localStorage.getItem('token');
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };

  const answer = confirm(`Oletko varma, että haluat poistaa käyttäjän ID: ${id} `);
  if (answer) {
    fetchData(url, options).then((data) => {
      console.log(data)
      getUsers();
    });
  }
}


async function showUserName() {
  // hae käyttäjän omat tiedot
  // 1. joko lokal storagesta jos on tallessa
  //let name = localStorage.getItem('name');

  //document.getElementById('name').innerHTML = name;
  // 2. hae uudestaan /api/auth/me endpointin kautta

  const url = 'http://localhost:3000/api/auth/me';
  let token = localStorage.getItem('token');

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    document.getElementById('name').innerHTML = data.user.username;
  });
}


document.querySelector('.update_user').addEventListener('click', updateUser);

async function updateUser(evt) {
  evt.preventDefault(); 

  const url = 'http://127.0.0.1:3000/api/users/';
  let token = localStorage.getItem('token');

  // Haetaan lomakkeen tiedot
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const userData = {
    username: username,
    password: password,
    email: email
  };

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(userData)
  };
  fetchData(url, options).then((data) => {
    console.log(data);
  });
}

// logataan ulos kun painetaan logout nappulaa

document.querySelector('.logout').addEventListener('click', logOut);

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem('token');
  console.log('logginout');
  window.location.href = 'index.html';
}

showUserName();
