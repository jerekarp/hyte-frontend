'use strict';

let lowBmi = `Jos painoindeksi on alle 18,5, se merkitsee liiallista laihuutta. ...`;

let normalBmi = `Normaaliksi on valittu se painoindeksin alue, jossa ihmisen terveys...`;

let highBmi = `Kun painoindeksi ylittää 25, ollaan liikapainon puolella. Liikakilojen määrä voi ...`;

function resettiFunktio() {
  document.querySelector('.bmi-score').textContent = '';
  document.querySelector('.analysis').textContent = '';

  document.querySelectorAll('.bmi0-19, .bmi25-30, .bmi19-25').forEach((element) => {
    element.style.color = ''; // Värin poisto
  });

  document.querySelectorAll('.bmi19-25').forEach((element) => {
    element.classList.remove('normalBmi');
  });
}


function bmiLaskuri(weight, height) {
  console.log('Lasketaan BMI');
  let bmi = (weight / ((height * height) / 10000)).toFixed(1);
  console.log(bmi);
  
  const bmiScoreElement = document.querySelector('.bmi-score');
  const analysisElement = document.querySelector('.analysis');
  const resultTextElement = document.querySelector('.result-text');

  resettiFunktio();

  bmiScoreElement.textContent = bmi;

  if (bmi < 18.5) {
    analysisElement.textContent = lowBmi;
    resultTextElement.textContent = 'Alipaino';
    document.querySelector('.bmi0-19').style.color = 'cyan';
  } else if (bmi > 25) {
    analysisElement.textContent = highBmi;
    resultTextElement.textContent = 'Ylipaino';
    if (bmi > 35) {
      document.querySelector('.bmi25-30').style.color = 'red';
    } else {
      document.querySelector('.bmi25-30').style.color = 'orange';
    }
  } else {
    analysisElement.textContent = normalBmi;
    resultTextElement.textContent = 'Normaali paino';
    document.querySelectorAll('.bmi19-25').forEach((element) => {
      element.style.color = 'green';
      element.classList.add('normalBmi');
    });
  }
}


document.addEventListener('keydown', function (e) {
  console.log(e.key);
});

const nappula = document.querySelector('.calculate');
nappula.addEventListener('click', function (evt) {
  console.log('Nappulaa klikattiin');
  console.log(evt);

  const weight = Number(document.getElementById('weight').value);
  const height = Number(document.getElementById('height').value);

  console.log(typeof weight);
  let yht = weight + height;
  console.log(yht);

  if (!weight || !height) {
    analysis.textContent =
      'Muista lisätä ne numerot jotta voimme laskea 🎱!!!!!';
  } else {
    bmiLaskuri(weight, height);
  }
});