import { fetchData } from './fetch.js';

async function showUserName() {
  // hae käyttäjän omat tiedot
  // 1. joko lokal storagesta jos on tallessa
  //let name = localStorage.getItem('name');

  //document.getElementById('name').innerHTML = name;
  // 2. hae uudestaan /api/auth/me endpointin kautta

  const url = "http://localhost:3000/api/auth/me";
  let token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer: " + token,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    const username = data.user.username;
    document.getElementById("name").innerHTML = username;
  });
}

document.querySelector('.logout').addEventListener('click', logOut);

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem('token');
  console.log('logginout');
  window.location.replace('index.html');
}

showUserName();