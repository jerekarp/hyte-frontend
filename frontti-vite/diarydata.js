export async function showDiary(element) {
    const diarySection = document.getElementById(element);
    diarySection.innerHTML = '';

    try {
        const response = await fetch('http://127.0.0.1:3000/api/entries/10');
        const data = await response.json();
        console.log(data);

        const card = createCards(data);
        diarySection.appendChild(card);
    } catch (error) {
        console.error('Virhe haettaessa päiväkirjamerkintöjä:', error);
    }
}

  
  function createCards(entry) {
    const defaultImageUrl = 'img/gym.jpg';
    
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = defaultImageUrl;
    image.classList.add('card-img');

    const content = document.createElement('div');
    content.classList.add('card-diary');

    const date = document.createElement('p');
    date.textContent = entry.entry_date;
    const mood = document.createElement('p');
    mood.textContent = 'Mood: ' + entry.mood;
    const weight = document.createElement('p');
    weight.textContent = 'Weight: ' + entry.weight + ' kg';
    const sleepHours = document.createElement('p');
    sleepHours.textContent = 'Sleep hours: ' + entry.sleep_hours;
    const notes = document.createElement('p');
    notes.textContent = 'Notes: ' + entry.notes;

    content.appendChild(date);
    content.appendChild(mood);
    content.appendChild(weight);
    content.appendChild(sleepHours);
    content.appendChild(notes);

    card.appendChild(image);
    card.appendChild(content);

    return card;
}

  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.diary').addEventListener('click', () => {
      showDiary('diary-section');
    });
  });
  