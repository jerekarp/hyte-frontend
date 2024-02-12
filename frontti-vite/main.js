import './style.css';

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
  const jokeDiv = document.getElementById('show_joke');
  const joke = await fetchChuckNorrisJoke();
  jokeDiv.innerHTML = joke;
}

document.querySelector('.chuck').addEventListener('click', displayChuckNorrisJoke);
