import { fetchData } from "/fetch.js";
12;

// haetaan kaikki käyttäjät ja luodaan niistä taulukko

const PAGE_SIZE = 10;
let currentPage = 1;
let totalPages = 1;

const allButton = document.querySelector(".get_users");
allButton.addEventListener("click", getUsers);

async function getUsers() {
  const url = "/api/users";
  let token = localStorage.getItem("token");
  document.querySelector(".get_users").style.display = "none";
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer: " + token,
    },
  };
  fetchData(url, options).then((data) => {
    totalPages = Math.ceil(data.length / PAGE_SIZE);
    renderPagination();
    createTable(data);
  });
}

function createTable(data) {
  const tbody = document.querySelector(".tbody");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const usersOnPage = data.slice(start, end);

  usersOnPage.forEach((element) => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerText = element.username;

    const td2 = document.createElement("td");
    td2.innerText = element.user_level;

    const td3 = document.createElement("td");
    const button1 = document.createElement("button");
    button1.className = "update";
    button1.setAttribute("data-id", element.user_id);
    button1.innerText = "Info";
    td3.appendChild(button1);

    button1.addEventListener("click", getUser);

    const td4 = document.createElement("td");
    const button2 = document.createElement("button");
    button2.className = "del";
    button2.setAttribute("data-id", element.user_id);
    button2.innerText = "Delete";
    td4.appendChild(button2);

    button2.addEventListener("click", deleteUser);

    const td5 = document.createElement("td");
    td5.innerText = element.user_id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);
  });
}

function renderPagination() {
  const paginationDiv = document.querySelector(".pagination");
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.addEventListener("click", () => {
      currentPage = i;
      getUsers();
    });
    paginationDiv.appendChild(button);
  }
}

// Haetaan dialogi yksittäisille tiedoille
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const dialog = document.querySelector(".info_dialog");
const closeButton = document.querySelector(".info_dialog button");
// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

async function getUser(evt) {
  // haetaan data-attribuutin avulla id, tämä nopea tapa
  const id = evt.target.attributes["data-id"].value;

  const url = `/api/users/${id}`;

  let token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer: " + token,
    },
  };
  fetchData(url, options).then((data) => {
    // Avaa modaali
    dialog.showModal();
    dialog.querySelector("p").innerHTML = `
          <div>User ID: <span>${data.user_id}</span></div>
          <div>User Name: <span>${data.username}</span></div>
          <div>Email: <span>${data.email}</span></div>
          <div>Role: <span>${data.user_level}</span></div>
    `;
  });
}

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
  });
}

showUserName();


async function deleteUser(evt) {
  const id = evt.target.attributes["data-id"].value;
  const url = `/api/users/${id}`;
  const token = localStorage.getItem("token");
  const isAdminUser = await isAdmin(); // Check admin rights

  const deleteDialog = document.querySelector(".delete_dialog");

  deleteDialog.querySelector(
    "p"
  ).innerText = `Are you sure that you want to delete user ID: ${id}?`;
  deleteDialog.showModal();

  deleteDialog
    .querySelector(".close_button")
    .addEventListener("click", function () {
      deleteDialog.close();
    });

  deleteDialog
    .querySelector(".delete_button")
    .addEventListener("click", async function () {
      if (isAdminUser === 'admin' || id === localStorage.getItem("user_id")) {
        try {
          const options = {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + token,
            },
          };

          const result = await fetchData(url, options);

          // Check if the user is deleting their own account
          if (id === localStorage.getItem("user_id")) {
            const dialogText = deleteDialog.querySelector("p");
            deleteDialog.style.border = '3px solid rgb(85, 187, 27)'; 
            dialogText.innerText = "Your account is now deleted, logging out in 3 seconds..."
            dialogText.style.fontWeight = "bold";
            dialogText.style.fontSize = "25px";
            dialogText.style.color = 'rgb(85, 187, 27)';
            setTimeout(() => {
              dialogText.innerText = "";
              deleteDialog.style.border = "";
              dialogText.style.fontWeight = "";
              dialogText.style.fontSize = "";
              dialogText.style.color = "";
              deleteDialog.close();
              logOutIfUserDeleted(); // Logout if the user deletes their own account
            }, 3500);
            return;
          }

          const dialogText2 = deleteDialog.querySelector("p");
          deleteDialog.style.border = '3px solid rgb(85, 187, 27)'; 
          dialogText2.innerText = "User deleted successfully!";
          dialogText2.style.fontWeight = "bold";
          dialogText2.style.fontSize = "20px";
          dialogText2.style.color = "rgb(85, 187, 27)";
          setTimeout(() => {
            dialogText2.innerText = "";
            deleteDialog.style.border = "";
            dialogText2.style.fontWeight = "";
            dialogText2.style.fontSize = "";
            dialogText2.style.color = "";
            deleteDialog.close();
          }, 2000);
          return;
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      } else {
        const dialogText3 = deleteDialog.querySelector("p");
        deleteDialog.style.border = '3px solid rgb(250, 3, 3)'; 
        dialogText3.innerText = "Error deleting user! Only admins can delete other users!";
        dialogText3.style.fontWeight = "bold";
        dialogText3.style.fontSize = "20px";
        setTimeout(() => {
          dialogText3.innerText = "";
          deleteDialog.style.border = "";
          dialogText3.style.fontWeight = "";
          dialogText3.style.fontSize = "";
          deleteDialog.close();
        }, 4000);
      }
    });
}


async function isAdmin() {
  let user = localStorage.getItem("user_level");
  return user;
}

document.querySelector(".update_user").addEventListener("click", updateUser);

async function updateUser(evt) {
  evt.preventDefault();

  const url = "/api/users/";
  let token = localStorage.getItem("token");

  // Haetaan lomakkeen tiedot
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const form = document.getElementById("addForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const userData = {
    username: username,
    password: password,
    email: email,
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(userData),
  };
  fetchData(url, options).then((data) => {
    // Näytä ilmoitus käyttäjän päivityksen jälkeen
    const notificationUserUpdated = document.getElementById(
      "notificationUserUpdated"
    );
    notificationUserUpdated.classList.add("show-notification");
    setTimeout(() => {
      notificationUserUpdated.classList.remove("show-notification");
    }, 3000);
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("email").value = "";
    getUsers();
  });
}

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

function logOutIfUserDeleted() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("name");
  localStorage.removeItem("user_level");
  window.location.href = "index.html";
}