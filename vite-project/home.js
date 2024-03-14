import { fetchData } from "/fetch.js";

// Funktio, joka luo taulukon päiväkirjamerkinnöille
function createEntryTable(entries) {
  // Etsi taulukko, johon lisätään päiväkirjamerkinnät
  const tableBody = document.querySelector(".entry-table tbody");

  // Tyhjennä taulukko ennen kuin lisätään uudet merkinnät
  tableBody.innerHTML = "";

  if (entries.length === 0) {
    // Jos merkintöjä ei ole, näytetään viesti
    const noEntriesRow = document.createElement("tr");
    const noEntriesCell = document.createElement("td");
    noEntriesCell.setAttribute("colspan", "6"); // Yhdistetään solut rivin leveyden mukaan
    noEntriesCell.textContent =
      "Ei päiväkirjamerkintöjä vielä, aloita lisäämällä merkintä!";
    console.log(noEntriesCell.style.color);
    noEntriesRow.appendChild(noEntriesCell);
    tableBody.appendChild(noEntriesRow);
    return; // Poistutaan funktion suorituksesta, koska ei ole mitään lisättävää
  }

  // Käy läpi jokainen päiväkirjamerkintä
  entries.forEach((entry) => {
    // Luo uusi rivi (TR)
    const row = document.createElement("tr");

    const createdCell = document.createElement("td");
    createdCell.textContent = formatDateString(entry.created_at);

    const entryDateCell = document.createElement("td");
    entryDateCell.textContent = formatDateString(entry.entry_date);

    const moodCell = document.createElement("td");
    moodCell.textContent = entry.mood;

    const notesCell = document.createElement("td");
    notesCell.textContent = entry.notes;

    const sleepHoursCell = document.createElement("td");
    sleepHoursCell.textContent = entry.sleep_hours;

    const weightCell = document.createElement("td");
    weightCell.textContent = entry.weight;

    // Lisää solut riville
    row.appendChild(createdCell);
    row.appendChild(entryDateCell);
    row.appendChild(moodCell);
    row.appendChild(notesCell);
    row.appendChild(sleepHoursCell);
    row.appendChild(weightCell);

    // Lisää rivi taulukkoon
    tableBody.appendChild(row);
  });
}

function createActivityTable(activities) {
  // Etsi taulukko, johon lisätään aktiviteetit
  const tableBody = document.querySelector(".activity-table tbody");

  // Tyhjennä taulukko ennen kuin lisätään uudet aktiviteetit
  tableBody.innerHTML = "";

  if (activities.length === 0) {
    const noActivitiesRow = document.createElement("tr");
    const noActivitiesCell = document.createElement("td");
    noActivitiesCell.setAttribute("colspan", "4"); // Yhdistetään solut rivin leveyden mukaan
    noActivitiesCell.textContent =
      "Ei aktiviteetteja vielä, aloita lisäämällä aktiviteetti!";
    noActivitiesRow.appendChild(noActivitiesCell);
    tableBody.appendChild(noActivitiesRow);
    return;
  }

  // Käy läpi jokainen aktiviteetti
  activities.forEach((activity) => {
    // Luo uusi rivi (TR)
    const row = document.createElement("tr");

    const createdCell = document.createElement("td");
    createdCell.textContent = formatDateString(activity.created_at); // Muotoillaan päivämäärä

    const activityTypeCell = document.createElement("td");
    activityTypeCell.textContent = activity.activity_type;

    const intensityCell = document.createElement("td");
    intensityCell.textContent = activity.intensity;

    const durationCell = document.createElement("td");
    durationCell.textContent = activity.duration;

    // Lisää solut riville
    row.appendChild(createdCell);
    row.appendChild(activityTypeCell);
    row.appendChild(intensityCell);
    row.appendChild(durationCell);

    // Lisää rivi taulukkoon
    tableBody.appendChild(row);
  });
}

function createMeasurementTable(measurements) {
  const tableBody = document.querySelector(".measurements-table tbody");

  tableBody.innerHTML = "";
  console.log("1");

  if (measurements.length === 0) {
    const noMeasurementsRow = document.createElement("tr");
    const noMeasurementsCell = document.createElement("td");
    noMeasurementsCell.setAttribute("colspan", "4");
    noMeasurementsCell.textContent =
      "Ei mittauksia vielä, aloita lisäämällä mittaus!";
    noMeasurementsRow.appendChild(noMeasurementsCell);
    tableBody.appendChild(noMeasurementsRow);
    return;
  }

  measurements.forEach((measurement) => {
    const row = document.createElement("tr");

    const measurementTimeCell = document.createElement("td");
    measurementTimeCell.textContent = formatDateString(measurement.measurement_time);

    const measurementTypeCell = document.createElement("td");
    measurementTypeCell.textContent = measurement.measurement_type;

    const valueCell = document.createElement("td");
    valueCell.textContent = measurement.value;

    const unitCell = document.createElement("td");
    unitCell.textContent = measurement.unit;

    const notesCell = document.createElement("td");
    notesCell.textContent = measurement.notes;

    row.appendChild(measurementTimeCell);
    row.appendChild(measurementTypeCell);
    row.appendChild(valueCell);
    row.appendChild(unitCell);
    row.appendChild(notesCell);

    tableBody.appendChild(row);
  });
}

// Muuntaa ISO-muotoisen päivämäärän selkeämmäksi muodoksi
function formatDateString(dateString) {
  const date = new Date(dateString);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("fi-FI", options);
}

const getEntryButton = document.querySelector(".get_entry");
getEntryButton.addEventListener("click", async () => {
  let token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const url = `http://localhost:3000/api/entries`;

  fetchData(url, options)
    .then((data) => {
      createEntryTable(data);
    })
    .catch((error) => {
      console.error("Error fetching entries:", error);
    });
});

const getActivityButton = document.querySelector(".get_activity");
getActivityButton.addEventListener("click", async () => {
  let token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const url = `http://localhost:3000/api/activities`;

  fetchData(url, options)
    .then((data) => {
      createActivityTable(data);
    })
    .catch((error) => {
      console.error("Error fetching activities:", error);
    });
});

const getMeasurementsButton = document.querySelector(".get_measurements");
getMeasurementsButton.addEventListener("click", async () => {
  let token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const url = `http://localhost:3000/api/measurements`;

  fetchData(url, options)
    .then((data) => {
      console.log(data)
      createMeasurementTable(data);
    })
    .catch((error) => {
      console.error("Error fetching measurements:", error);
    });
});

const activityForm = document.getElementById("activityForm");
const activityTableBody = document.querySelector(".activity-table tbody");

activityForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Hae token local storagesta
  let token = localStorage.getItem("token");

  // Hae lomakkeen tiedot
  const activityType = document.getElementById("activityType").value;
  const intensity = document.getElementById("intensity").value;
  const duration = document.getElementById("duration").value;

  // Muodosta pyyntöä varten asetukset, mukaan lukien Authorization-header
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      activity_type: activityType,
      intensity: intensity,
      duration: duration,
    }),
  };

  // Muodosta URL
  const url = `http://localhost:3000/api/activities`;

  try {
    // Lähetä pyyntö backendiin
    const responseData = await fetchData(url, options);
    console.log("Activity added successfully:", responseData);

    // Lisää aktiviteetti listaan
    appendActivityToList(responseData);
  } catch (error) {
    console.error("Error adding activity:", error);
  }
});

function appendActivityToList(activity) {
  const row = document.createElement("tr");

  const createdCell = document.createElement("td");
  createdCell.textContent = activity.created_at; // Muotoillaan päivämäärä

  const activityTypeCell = document.createElement("td");
  activityTypeCell.textContent = activity.activity_type;

  const intensityCell = document.createElement("td");
  intensityCell.textContent = activity.intensity;

  const durationCell = document.createElement("td");
  durationCell.textContent = activity.duration;

  // Lisää solut riville
  row.appendChild(createdCell);
  row.appendChild(activityTypeCell);
  row.appendChild(intensityCell);
  row.appendChild(durationCell);

  // Lisää rivi taulukkoon
  activityTableBody.appendChild(row);
}

// Lisää tapahtumankäsittelijä napille
const postEntryButton = document.querySelector(".add-entry");
postEntryButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Hae token local storagesta
  let token = localStorage.getItem("token");

  // Hae lomakkeen tiedot
  const entryDate = document.getElementById("entryDate").value;
  const mood = document.getElementById("mood").value;
  const weight = document.getElementById("weight").value;
  const sleepHours = document.getElementById("sleepHours").value;
  const notes = document.getElementById("notes").value;

  // Muodosta pyyntöä varten asetukset, mukaan lukien Authorization-header
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      entry_date: entryDate,
      mood: mood,
      weight: weight,
      sleep_hours: sleepHours,
      notes: notes,
    }),
  };

  // Muodosta URL
  const url = `http://localhost:3000/api/entries`;

  // Lähetä pyyntö backendiin
  fetchData(url, options)
    .then((data) => {
      const notification = document.getElementById("notification");
      notification.classList.add("show-notification");
      setTimeout(() => {
        notification.classList.remove("show-notification");
      }, 3000);
    })
    .catch((error) => {
      console.error("Error adding entry:", error);
    });
});

// Lisää tapahtumankäsittelijä napille
const postActivityButton = document.querySelector(".add-activity");
postActivityButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Hae token local storagesta
  let token = localStorage.getItem("token");

  // Hae lomakkeen tiedot
  const activityType = document.getElementById("activityType").value;
  const intensity = document.getElementById("intensity").value;
  const duration = document.getElementById("duration").value;

  // Muodosta pyyntöä varten asetukset, mukaan lukien Authorization-header
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      activity_type: activityType,
      intensity: intensity,
      duration: duration,
    }),
  };

  // Muodosta URL
  const url = `http://localhost:3000/api/activities`;

  // Lähetä pyyntö backendiin
  fetchData(url, options)
    .then((data) => {
      const notification = document.getElementById("notificationActivity");
      notification.classList.add("show-notification");
      setTimeout(() => {
        notification.classList.remove("show-notification");
      }, 3000);
    })
    .catch((error) => {
      console.error("Error adding activity:", error);
    });
});

const postMeasurementButton = document.querySelector(".add-measurement");
postMeasurementButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let token = localStorage.getItem("token");

  const measurementType = document.getElementById("measurementType").value;
  const value = document.getElementById("value").value;
  const unit = document.getElementById("unit").value;
  const notesMeasurement = document.getElementById("notesMeasurement").value;

  const form = document.getElementById("measurementForm");

  // Tarkistetaan, onko form validi
  if (!form.checkValidity()) {
    form.reportValidity();
    return; // poistutaan funktiosta jos form ei ole validi
  }

  // Muodosta pyyntöä varten asetukset, mukaan lukien Authorization-header
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      measurement_type: measurementType,
      value: value,
      unit: unit,
      notes: notesMeasurement,
    }),
  };

  // Muodosta URL
  const url = `http://localhost:3000/api/measurements`;
  

  // Lähetä pyyntö backendiin
  fetchData(url, options)
    .then((data) => {
      const notification = document.getElementById("notificationMeasurement");
      notification.classList.add("show-notification");
      setTimeout(() => {
        notification.classList.remove("show-notification");
      }, 3000);
    })
    .catch((error) => {
      console.error("Error adding measurement:", error);
    });
});

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
    showGreeting(username);
  });
}

async function showGreeting(username) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Good afternoon";
  } else {
      greeting = "Good evening";
  }

  const notification = document.querySelector(".notificationWelcome");
  notification.innerHTML = `${greeting}, dear diary user, <strong>${username}</strong>!`;

  // Lisää luokka animaatiota varten
  notification.classList.add('showNotification');
  
  // Odota hetki ja poista animaatio
  setTimeout(() => {
      notification.classList.remove('showNotification');
  }, 5000); // Ajan pituus millisekunteina, tässä 5 sekuntia
}

showGreeting();


// Näytetään vain placeholderit käyttäjälle, kun hän valitsee input fieldin, johon hän on syöttämässä tietoja
document.addEventListener("DOMContentLoaded", function() {
  // Haetaan kaikki input-kentät
  var inputFields = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea');

  // Lisätään tapahtumankäsittelijä jokaiselle input-kentälle
  inputFields.forEach(function(input) {
    input.addEventListener('focus', function() {
      // Näytä placeholder-teksti vain, jos käyttäjä klikkaa kysymysmerkin kohdalle
      input.setAttribute('placeholder', input.getAttribute('data-placeholder'));
    });

    input.addEventListener('blur', function() {
      // Piilota placeholder-teksti, kun käyttäjä poistuu kentästä
      input.removeAttribute('placeholder');
    });
  });
});


// logataan ulos kun painetaan logout nappulaa

document.querySelector(".logout").addEventListener("click", logOut);

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem("token");
  console.log("logginout");
  window.location.href = "index.html";
}

// Formien selectori
// Alussa piilotetaan kaikki lomakkeet
document.querySelectorAll('.forms-container > div').forEach(form => {
  form.style.display = 'none';
});

// Kun valitsinta muutetaan, näytetään valitun lomake
document.getElementById('formSelector').addEventListener('change', function() {
  const selectedForm = this.value;
  const forms = document.querySelectorAll('.forms-container > div');
  
  // Piilotetaan kaikki lomakkeet
  forms.forEach(form => form.style.display = 'none');
  
  // Näytetään valittu lomake
  document.querySelector(`.${selectedForm}-form`).style.display = 'block';
});



showUserName();
