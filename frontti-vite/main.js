import './style.css';
import { showDiary } from "./diarydata.js";

async function fetchChuckNorrisJoke() {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Error fetching Chuck Norris joke:', error);
    return 'Error fetching Chuck Norris joke';
  }
}

async function displayChuckNorrisJoke() {
  try {
    const jokeDiv = document.getElementById('show_joke');
    const joke = await fetchChuckNorrisJoke();
    jokeDiv.innerHTML = joke;
  } catch (error) {
    console.error('Error displaying Chuck Norris joke:', error);
  }
}

document.querySelector('.chuck').addEventListener('click', displayChuckNorrisJoke);

document.addEventListener('DOMContentLoaded', () => {
  // Haetaan kissakuvat JSON-tiedostosta
  fetch('pics.json')
      .then(response => response.json())
      .then(data => {
          const cardsDiv = document.getElementById('cards');

          data.forEach(cat => {
              // Luodaan figure-elementti
              const figure = document.createElement('figure');

              // Luodaan img-elementti ja asetetaan attribuutit
              const img = document.createElement('img');
              img.src = cat.address;
              img.alt = cat.name;
              img.style.width = '100%';

              // Luodaan figcaption-elementti ja lisätään teksti
              const figcaption = document.createElement('figcaption');
              figcaption.textContent = cat.description;

              // Lisätään img ja figcaption figure-elementtiin
              figure.appendChild(img);
              figure.appendChild(figcaption);

              // Lisätään figure cards diviin
              cardsDiv.appendChild(figure);
          });
      })
      .catch(error => console.error(error));
  
});

showDiary(document.querySelector(".diary"));