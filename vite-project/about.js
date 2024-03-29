import { fetchData } from './fetch.js';

async function showUserName() {
  const url = "/api/auth/me";
  let token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer: " + token,
    },
  };
  fetchData(url, options).then((data) => {
    const username = data.user.username;
    document.getElementById("name").innerHTML = username;
    notification(username)
  });
}

async function notification(username) {
  const heroElement = document.getElementById('heroText');
  heroElement.textContent = `Thank you for choosing HealthDiary, ${username}!`;

  // Lisätään parallax-efekti h4-elementille
  const parallaxEffect = () => {
    const scrollPosition = window.pageYOffset;
    heroElement.style.transform = `translate(-50%, calc(-50% + ${scrollPosition / 2}px))`;
    requestAnimationFrame(parallaxEffect);
  };
  parallaxEffect();
}

document.querySelector('.logout').addEventListener('click', logOut);

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("name");
  localStorage.removeItem("user_level");
  window.location.replace('index.html');
}

showUserName();