import { fetchData } from "/fetch.js";

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

// Päiväkirjamerkintöjen tableen data
const PAGE_SIZE = 7;
let currentPage = 1;
let totalPages = 1;

const getEntryButton = document.querySelector(".get_entry");
getEntryButton.addEventListener("click", () => {
  getEntries();
});

async function getEntries() {
  const url = "/api/entries";
  let token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  fetchData(url, options).then((data) => {
    totalPages = Math.ceil(data.length / PAGE_SIZE);
    renderPagination();
    createEntryTable(data);
  });
}

// Luodaan päiväkirjamerkinnöistä table
function createEntryTable(entries) {
  const tableBody = document.querySelector(".entry-table tbody");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const entriesOnPage = entries.slice(start, end);

  if (entriesOnPage.length === 0) {
    const noEntriesRow = document.createElement("tr");
    const noEntriesCell = document.createElement("td");
    noEntriesCell.setAttribute("colspan", "6");
    noEntriesCell.textContent =
      "No diary entries yet, start by adding an entry!";
    noEntriesRow.appendChild(noEntriesCell);
    tableBody.appendChild(noEntriesRow);
    return;
  }

  getEntryButton.style.display = "none";

  entriesOnPage.forEach((entry) => {
    const row = document.createElement("tr");

    const entryIdCell = document.createElement("td");
    entryIdCell.textContent = entry.entry_id;

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

    row.appendChild(entryIdCell);
    row.appendChild(createdCell);
    row.appendChild(entryDateCell);
    row.appendChild(moodCell);
    row.appendChild(notesCell);
    row.appendChild(sleepHoursCell);
    row.appendChild(weightCell);

    tableBody.appendChild(row);
  });
}

// Pagination, sivunumerot päiväkirjamerkintöjen tablelle
function renderPagination() {
  const paginationDiv = document.querySelector(".pagination");
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.addEventListener("click", () => {
      currentPage = i;
      getEntries();
    });
    paginationDiv.appendChild(button);
  }
}

// Activities tableen data
const ACTIVITIES_PAGE_SIZE = 7;
let currentActivitiesPage = 1;
let totalActivitiesPages = 1;

const getActivitiesButton = document.querySelector(".get_activity");
getActivitiesButton.addEventListener("click", () => {
  getActivities();
});

async function getActivities() {
  let token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const url = `/api/activities`;

  fetchData(url, options)
    .then((data) => {
      totalActivitiesPages = Math.ceil(data.length / ACTIVITIES_PAGE_SIZE);
      renderActivitiesPagination();
      createActivitiesTable(data);
    })
    .catch((error) => {
      console.error("Error fetching activities:", error);
    });
}

// Luodaan activities merkinnöistä table
function createActivitiesTable(activities) {
  const tableBody = document.querySelector(".activity-table tbody");

  tableBody.innerHTML = "";

  const start = (currentActivitiesPage - 1) * MEASUREMENT_PAGE_SIZE;
  const end = start + ACTIVITIES_PAGE_SIZE;
  const activitiesOnPage = activities.slice(start, end);

  if (activitiesOnPage.length === 0) {
    const noActivitiesRow = document.createElement("tr");
    const noActivitiesCell = document.createElement("td");
    noActivitiesCell.setAttribute("colspan", "5");
    noActivitiesCell.textContent =
      "No activities yet, start by adding an activity!";
    noActivitiesRow.appendChild(noActivitiesCell);
    tableBody.appendChild(noActivitiesRow);
    return;
  }

  getActivitiesButton.style.display = "none";

  activitiesOnPage.forEach((activity) => {
    const row = document.createElement("tr");

    const activityIdCell = document.createElement("td");
    activityIdCell.textContent = activity.activity_id;

    const createdCell = document.createElement("td");
    createdCell.textContent = formatDateString(activity.created_at); // Muotoillaan päivämäärä

    const activityTypeCell = document.createElement("td");
    activityTypeCell.textContent = activity.activity_type;

    const intensityCell = document.createElement("td");
    intensityCell.textContent = activity.intensity;

    const durationCell = document.createElement("td");
    durationCell.textContent = activity.duration;

    row.appendChild(activityIdCell);
    row.appendChild(createdCell);
    row.appendChild(activityTypeCell);
    row.appendChild(intensityCell);
    row.appendChild(durationCell);

    tableBody.appendChild(row);
  });
}

// Pagination, sivunumerot activities tablelle
function renderActivitiesPagination() {
  const paginationDiv = document.querySelector(".activity-pagination");
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalActivitiesPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.addEventListener("click", () => {
      currentActivitiesPage = i;
      getActivities();
    });
    paginationDiv.appendChild(button);
  }
}

// Measurements tableen data
const MEASUREMENT_PAGE_SIZE = 7;
let currentMeasurementPage = 1;
let totalMeasurementPages = 1;

const getMeasurementsButton = document.querySelector(".get_measurements");
getMeasurementsButton.addEventListener("click", () => {
  getMeasurements();
});

async function getMeasurements() {
  let token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const url = `/api/measurements`;

  fetchData(url, options)
    .then((data) => {
      totalMeasurementPages = Math.ceil(data.length / PAGE_SIZE);
      renderMeasurementPagination();
      createMeasurementTable(data);
    })
    .catch((error) => {
      console.error("Error fetching measurements:", error);
    });
}

// Luodaan measurements merkinnöistä table
function createMeasurementTable(measurements) {
  const tableBody = document.querySelector(".measurements-table tbody");

  tableBody.innerHTML = "";

  const start = (currentMeasurementPage - 1) * MEASUREMENT_PAGE_SIZE;
  const end = start + MEASUREMENT_PAGE_SIZE;
  const measurementsOnPage = measurements.slice(start, end);

  if (measurementsOnPage.length === 0) {
    const noMeasurementsRow = document.createElement("tr");
    const noMeasurementsCell = document.createElement("td");
    noMeasurementsCell.setAttribute("colspan", "5");
    noMeasurementsCell.textContent =
      "No measurements yet, start by adding a measurement!";
    noMeasurementsRow.appendChild(noMeasurementsCell);
    tableBody.appendChild(noMeasurementsRow);
    return;
  }

  getMeasurementsButton.style.display = "none";

  measurementsOnPage.forEach((measurement) => {
    const row = document.createElement("tr");

    const measurementTimeCell = document.createElement("td");
    measurementTimeCell.textContent = formatDateString(
      measurement.measurement_time
    );

    const measurementIdCell = document.createElement("td");
    measurementIdCell.textContent = measurement.measurement_id;

    const measurementTypeCell = document.createElement("td");
    measurementTypeCell.textContent = measurement.measurement_type;

    const valueCell = document.createElement("td");
    valueCell.textContent = measurement.value;

    const unitCell = document.createElement("td");
    unitCell.textContent = measurement.unit;

    const notesCell = document.createElement("td");
    notesCell.textContent = measurement.notes;

    row.appendChild(measurementIdCell);
    row.appendChild(measurementTimeCell);
    row.appendChild(measurementTypeCell);
    row.appendChild(valueCell);
    row.appendChild(unitCell);
    row.appendChild(notesCell);

    tableBody.appendChild(row);
  });
}

// Pagination, sivunumerot measurements tablelle
function renderMeasurementPagination() {
  const paginationDiv = document.querySelector(".measurement-pagination");
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalMeasurementPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.addEventListener("click", () => {
      currentMeasurementPage = i;
      getMeasurements();
    });
    paginationDiv.appendChild(button);
  }
}

// Diary entry formi
const postEntryButton = document.querySelector(".add-entry");
postEntryButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let token = localStorage.getItem("token");

  const entryDate = document.getElementById("entryDate").value;
  const mood = document.getElementById("mood").value;
  const weight = document.getElementById("weight").value;
  const sleepHours = document.getElementById("sleepHours").value;
  const notes = document.getElementById("notes").value;

  const form = document.getElementById("entryForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

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

  const url = `/api/entries`;

  fetchData(url, options)
    .then((data) => {
      const notification = document.getElementById("notification");
      notification.classList.add("show-notification");

      document.getElementById("entryDate").value = "";
      document.getElementById("mood").value = "";
      document.getElementById("weight").value = "";
      document.getElementById("sleepHours").value = "";
      document.getElementById("notes").value = "";

      setTimeout(() => {
        notification.classList.remove("show-notification");
      }, 3000);
    })
    .catch((error) => {
      console.error("Error adding entry:", error);
    });
});

// Activity formi
const postActivityButton = document.querySelector(".add-activity");
postActivityButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let token = localStorage.getItem("token");

  const activityType = document.getElementById("activityType").value;
  const intensity = document.getElementById("intensity").value;
  const duration = document.getElementById("duration").value;
  const form = document.getElementById("activityForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

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

  const url = `/api/activities`;

  fetchData(url, options)
    .then((data) => {
      const notification = document.getElementById("notificationActivity");
      notification.classList.add("show-notification");

      document.getElementById("activityType").value = "";
      document.getElementById("intensity").value = "";
      document.getElementById("duration").value = "";

      setTimeout(() => {
        notification.classList.remove("show-notification");
      }, 3000);
    })
    .catch((error) => {
      console.error("Error adding activity:", error);
    });
});

// Measurements formi
const postMeasurementButton = document.querySelector(".add-measurement");
postMeasurementButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let token = localStorage.getItem("token");

  const measurementType = document.getElementById("measurementType").value;
  const valueMeas = document.getElementById("value").value;
  const unit = document.getElementById("unit").value;
  const notesMeasurement = document.getElementById("notesMeasurement").value;

  const form = document.getElementById("measurementForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      measurement_type: measurementType,
      value: valueMeas,
      unit: unit,
      notes: notesMeasurement,
    }),
  };

  const url = `/api/measurements`;

  fetchData(url, options)
    .then((data) => {
      const notification = document.getElementById("notificationMeasurement");
      notification.classList.add("show-notification");
      document.getElementById("measurementType").value = "";
      document.getElementById("value").value = "";
      document.getElementById("unit").value = "";
      document.getElementById("notesMeasurement").value = "";
      setTimeout(() => {
        notification.classList.remove("show-notification");
      }, 3000);
    })
    .catch((error) => {
      console.error("Error adding measurement:", error);
    });
});

// Funktio, joka näyttää sivustolla kirjautuneen käyttäjän käyttäjänimen
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
    showGreeting(username);
  });
}

showUserName();

// Näytetään tervehdys käyttäjälle vuorokauden ajan mukaan
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

  notification.classList.add("show-notification");

  setTimeout(() => {
    notification.classList.remove("show-notification");
  }, 5000);
}

showGreeting();

// Näytetään vain placeholderit käyttäjälle, kun hän valitsee input fieldin, johon hän on syöttämässä tietoja
document.addEventListener("DOMContentLoaded", function () {
  // Haetaan kaikki input-kentät
  var inputFields = document.querySelectorAll(
    'input[type="text"], input[type="number"], input[type="date"], textarea'
  );

  // Lisätään tapahtumankäsittelijä jokaiselle input-kentälle
  inputFields.forEach(function (input) {
    input.addEventListener("focus", function () {
      // Näytä placeholder-teksti vain, jos käyttäjä klikkaa kysymysmerkin kohdalle
      input.setAttribute("placeholder", input.getAttribute("data-placeholder"));
    });

    input.addEventListener("blur", function () {
      // Piilota placeholder-teksti, kun käyttäjä poistuu kentästä
      input.removeAttribute("placeholder");
    });
  });
});

// logataan ulos kun painetaan logout nappulaa
document.querySelector(".logout").addEventListener("click", logOut);

function logOut(evt) {
  evt.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("name");
  localStorage.removeItem("user_level");
  window.location.href = "index.html";
}

// Formien selectori
// Alussa piilotetaan kaikki lomakkeet
document.querySelectorAll(".forms-container > div").forEach((form) => {
  form.style.display = "none";
});

document.getElementById("formSelector").addEventListener("change", function () {
  const selectedForm = this.value;
  const forms = document.querySelectorAll(".forms-container > div");

  // Piilotetaan kaikki lomakkeet
  forms.forEach((form) => (form.style.display = "none"));

  // Näytetään valittu lomake
  document.querySelector(`.${selectedForm}-form`).style.display = "block";
});


document.getElementById("updateFormSelector").addEventListener("change", function () {
  const selectedForm = this.value;
  const forms = document.querySelectorAll(".forms-container > div");

  forms.forEach((form) => (form.style.display = "none"));
  
  document.querySelector(`.update${selectedForm.charAt(0).toUpperCase() + selectedForm.slice(1)}-form`).style.display = "block";
});


// Update diary entry form
const updateEntryButton = document.querySelector(".update-entry");
updateEntryButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let token = localStorage.getItem("token");

  const entryId = document.getElementById("updateEntryId").value;
  const entryDate = document.getElementById("updateEntryDate").value;
  const mood = document.getElementById("updateMood").value;
  const weight = document.getElementById("updateWeight").value;
  const sleepHours = document.getElementById("updateSleepHours").value;
  const notes = document.getElementById("updateNotes").value;

  const form = document.getElementById("updateEntryForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const options = {
    method: "PUT",
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

  const url = `/api/entries/${entryId}`;

  fetchData(url, options)
  .then((data) => {
    if (data.message === "Entry data updated") {
      const notification = document.getElementById("notification");
      notification.classList.add("show-notification");
      setTimeout(() => {
        notification.classList.remove("show-notification");
      }, 3000);
    } else {
    }
  })
  .catch((error) => {
    alert("Error updating entry: Please ensure all fields meet the required criteria");
    console.error("Error updating entry:", error);
  });
});

// Update activity entry form
const updateActivityButton = document.querySelector(".update-activity");
updateActivityButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let token = localStorage.getItem("token");

  const activityId = document.getElementById("updateActivityId").value;
  const activityType = document.getElementById("updateActivityType").value;
  const intensity = document.getElementById("updateIntensity").value;
  const duration = document.getElementById("updateDuration").value;

  const form = document.getElementById("updateActivityForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const options = {
    method: "PUT",
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

  const url = `/api/activities/${activityId}`;

  fetchData(url, options)
  .then((data) => {
    if (data.message === "Activity data updated") {
      const notification = document.getElementById("notificationActivity");
      notification.classList.add("show-notification");
      setTimeout(() => {
        notification.classList.remove("show-notification");
      }, 3000);
    } else {
    }
  })
  .catch((error) => {
    alert("Error updating entry: Please ensure all fields meet the required criteria");
    console.error("Error updating activity:", error);
  });
});



// Update measurement entry form
const updateMeasurementButton = document.querySelector(".update-measurement");
updateMeasurementButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let token = localStorage.getItem("token");

  const measurementId = document.getElementById("updateMeasurementId").value;
  const measurementType = document.getElementById("updateMeasurementType").value;
  const valueMeas = document.getElementById("updateValue").value;
  const unit = document.getElementById("updateUnit").value;
  const notesMeasurement = document.getElementById("updateNotesMeasurement").value;

  const form = document.getElementById("updateMeasurementForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      measurement_type: measurementType,
      value: valueMeas,
      unit: unit,
      notes: notesMeasurement,
    }),
  };

  const url = `/api/measurements/${measurementId}`;

  fetchData(url, options)
  .then((data) => {
    if (data.message === "Measurements data updated") {
      const notification = document.getElementById("notificationMeasurement");
      notification.classList.add("show-notification");
      setTimeout(() => {
        notification.classList.remove("show-notification");
      }, 3000);
    } else {
    }
  })
  .catch((error) => {
    alert("Error updating entry: Please ensure all fields meet the required criteria");
    console.error("Error updating measurement:", error);
  });
});