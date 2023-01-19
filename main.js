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
    window.location.reload();
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
//assign transaction icons to variables
const iconType1 = `<img class="icon" src="images/icon-income-other.png">`;
const iconType2 = `<img class="icon" src="images/icon-outcome-shopping.png">`;
const iconType3 = `<img class="icon" src="images/icon-income-salary.png">`;
const iconType4 = `<img class="icon" src="images/icon-outcome-other.png">`;
//request data from API
fetch("https://api.npoint.io/38edf0c5f3eb9ac768bd")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // assign an icon to type of transaction
    data.transactions.forEach((record) => {
      switch (record.type) {
        case 1:
          record.type = iconType1;
          break;
        case 2:
          record.type = iconType2;
          break;
        case 3:
          record.type = iconType3;
          break;
        case 4:
          record.type = iconType4;
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
    const transactionTypes = data.transacationTypes;
    const transactions = data.transactions;
    const amounts = transactions.map((transaction) => transaction.amount);
    const dates = transactions.map((transaction) => transaction.date).reverse();
    const dailyBalance = transactions
      .map((transaction) => transaction.balance)
      .reverse();
    const barChart = document.getElementById("bar__chart");
    const pieChart = document.getElementById("pie__chart");
    //draw pie chart
    new Chart(pieChart, {
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
    //draw bar chart
    new Chart(barChart, {
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
