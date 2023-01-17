//get navigation buttons and sections
const mainSection = document.querySelector(".main__card");
const signUpSection = document.querySelector(".signup__card");
const logInSection = document.querySelector(".login__card");
const userInterface = document.querySelector(".user__interface");
const signUpBtn = document.getElementById("signup__nav");
const logInBtn = document.getElementById("login__nav");
const logOutBtn = document.getElementById("logout__nav");
const loggedUser = document.querySelector(".currently__logged");
// put sections and buttons into arrays
const sectionsArray = [logInSection, signUpSection, mainSection, userInterface];
const buttonsArray = [signUpBtn, logInBtn, logOutBtn, loggedUser];
//shows button defined as an argument
function showButtons(buttonsArray) {
  buttonsArray.forEach((button) => {
    if (!button.classList.contains("active")) {
      button.classList.add("active");
    }
  });
}
// hides button defined as an argument
function hideButtons(buttonsArray) {
  buttonsArray.forEach((button) => {
    if (button.classList.contains("active")) {
      button.classList.remove("active");
    }
  });
}
// set section as function argument
function showSection(section) {
  //remove active class from all elements in array
  sectionsArray.forEach((section) => section.classList.remove("active"));
  //add active class to section in argument
  section.classList.toggle("active");
  //show and hide buttons depending on section taken as argument
  switch (section) {
    case logInSection:
      showButtons([signUpBtn]);
      hideButtons([logInBtn, logOutBtn, loggedUser]);
      break;
    case signUpSection:
      showButtons([logInBtn]);
      hideButtons([signUpBtn, logOutBtn, loggedUser]);
      break;
    case mainSection:
      showButtons([signUpBtn, logInBtn]);
      hideButtons([logOutBtn, loggedUser]);
      break;
    case userInterface:
      showButtons([logOutBtn, loggedUser]);
      hideButtons([signUpBtn, logInBtn]);
      break;
  }
}
//run functions on click event
logInBtn.addEventListener("click", () => showSection(logInSection));
signUpBtn.addEventListener("click", () => showSection(signUpSection));
logOutBtn.addEventListener("click", () => {
  showSection(mainSection);
  logOut();
});

//check if an user is logged in
let currentlyLoggedUser = sessionStorage.getItem("currentlyLogged");
if (currentlyLoggedUser) {
  showSection(userInterface);
  loggedUser.innerHTML = "&#x1f464; " + currentlyLoggedUser;
} else {
  showSection(mainSection);
  loggedUser.innerHTML = " ";
}
// ---------------------------------------------------------------------------
// get input from signup form
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signUpForm = document.getElementById("signup");

function signUp(event) {
  event.preventDefault();
  //create object containing input values
  const newUser = {
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  //get existing users from localStorage
  const users = JSON.parse(localStorage.getItem("users"));
  //function checking if username or email is already in use
  function checkUser() {
    return users.some(
      (user) =>
        user.username === newUser.username || user.email === newUser.email
    );
  }

  //check if object users exists in localStorage
  if (localStorage.getItem("users")) {
    //check if username or email is already taken
    if (checkUser()) {
      alert("Nazwa bądź adres E-mail jest już zarejestrowany.");
    } //if not, add newUser to localStorage
    else {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Konto zostało utworzone.");
      signUpForm.reset();
      showSection(logInSection);
    }
  }
  //if users doesn't exist, create it with newUser
  else {
    localStorage.setItem("users", JSON.stringify([newUser]));
    alert("Konto zostało utworzone.");
    signUpForm.reset();
    showSection(logInSection);
  }
}
signUpForm.addEventListener("submit", signUp);

//--------------------------------------------------------------------------------------------------
//get input from login form
const username = document.getElementById("login__username");
const password = document.getElementById("login__password");
const logInForm = document.getElementById("login");

function logIn(event) {
  event.preventDefault();
  //check if username/email is matching with password
  const users = JSON.parse(localStorage.getItem("users"));
  function findUser() {
    return users.some(
      (user) =>
        (user.username === username.value || user.email === username.value) &&
        user.password === password.value
    );
  }
  if (findUser()) {
    //if a match is found, log user in
    sessionStorage.setItem("currentlyLogged", username.value);
    alert("Zostałeś zalogowany.");
    logInForm.reset();
    location.reload();
    showSection(userInterface);
    loggedUser.innerHTML = "&#x1f464; " + currentlyLoggedUser;
  }
  //if no match is found, display message
  else {
    alert("Nieprawidłowa nazwa użytkownika lub hasło");
  }
}

logInForm.addEventListener("submit", logIn);

function logOut() {
  sessionStorage.removeItem("currentlyLogged");
  loggedUser.innerHTML = " ";
}
//--------------------------------------------------------------------------------------------------

//request data from API
fetch("https://api.npoint.io/38edf0c5f3eb9ac768bd", {
  method: "GET",
})
  //turn response from API into json
  .then((response) => {
    return response.json();
  })
  //select transactions from received response
  .then((data) => {
    data.transactions.forEach((record) => {
      // assign an icon to type of transaction

      switch (record.type) {
        case 1:
          record.type = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#008000" fill-rule="evenodd" clip-rule="evenodd"><path d="M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z"/></svg>`;
          break;
        case 2:
          record.type = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#ff0000" fill-rule="evenodd" clip-rule="evenodd"><path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z"/></svg>`;
          break;
        case 3:
          record.type = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#008000" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 4h8v19h-24v-19h8v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2zm7 1h-22v17h22v-17zm-3 4v1h-16v-1h16zm-5-6.5c0-.133-.053-.26-.146-.354-.094-.093-.221-.146-.354-.146h-5c-.133 0-.26.053-.354.146-.093.094-.146.221-.146.354v1.5h6v-1.5z"/></svg>`;
          break;
        case 4:
          record.type = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#ff0000" fill-rule="evenodd" clip-rule="evenodd"><path d="M14 19v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.576-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.424 0 2.774-.302 4-.838v-2.162zm4-9.592l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z"/></svg></svg>`;
          break;
      }

      // for each transactions object, build following html and inject data into it
      const newRecord = `
      <ul class="transaction__details"> 
      <li class="date">${record.date}</li>
      <li class="type">${record.type}</li>
      <li class="desc">${record.description}</li>
      <li class="amount">${record.amount} zł</li>
      <li class="balance">${record.balance} zł</li>
      </ul>
        `;
      // select place where newRecord should be inserted
      document
        .querySelector(".transactions__container")
        .insertAdjacentHTML("beforeend", newRecord);
    });
  });
//----------------------------------------------------------------------------------------------
const pieChart = fetch("https://api.npoint.io/38edf0c5f3eb9ac768bd")
  .then((response) => response.json())
  .then((data) => {
    const transactionTypes = data.transacationTypes;
    const transactions = data.transactions;
    const amounts = transactions.map((transaction) => transaction.amount);
    const ctx = document.getElementById("pie__chart");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: transactionTypes,
        datasets: [
          {
            label: "kwota",
            data: amounts,
            borderWidth: 1,
          },
        ],
      },
    });
  });

const barChart = fetch("https://api.npoint.io/38edf0c5f3eb9ac768bd")
  .then((response) => response.json())
  .then((data) => {
    const transactionTypes = data.transacationTypes;
    const transactions = data.transactions;
    const dates = transactions.map((transaction) => transaction.date).reverse();
    const dailyBalance = transactions
      .map((transaction) => transaction.balance)
      .reverse();
    const ctx = document.getElementById("bar__chart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Saldo",
            data: dailyBalance,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `${value} zł`,
            },
          },
        },
      },
    });
  });
//----------------------------------------------------------------------------------------------
