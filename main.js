//get navigation elements and sections
const logInBtn = document.getElementById("login__nav");
const logInSection = document.querySelector(".login__card");

const signUpBtn = document.getElementById("signup__nav");
const signUpSection = document.querySelector(".signup__card");

const logOutBtn = document.getElementById("logout__nav");
const mainSection = document.querySelector(".main__card");

const userInterface = document.querySelector(".user__interface");

const mainBtn = document.getElementById("intive__logo");

function showLogInSection() {
  mainSection.classList.remove("active");
  signUpSection.classList.remove("active");
  userInterface.classList.remove("active");
  logInSection.classList.add("active");
  signUpBtn.classList.add("active");
  logInBtn.classList.remove("active");
  logOutBtn.classList.remove("active");
}

function showSignUpSection() {
  mainSection.classList.remove("active");
  logInSection.classList.remove("active");
  userInterface.classList.remove("active");
  signUpSection.classList.add("active");
  logInBtn.classList.add("active");
  logOutBtn.classList.remove("active");
  signUpBtn.classList.remove("active");
}

function showMainSection() {
  logInSection.classList.remove("active");
  signUpSection.classList.remove("active");
  userInterface.classList.remove("active");
  mainSection.classList.add("active");
  logInBtn.classList.add("active");
  signUpBtn.classList.add("active");
  logOutBtn.classList.remove("active");
}
function showUserInterface() {
  logInSection.classList.remove("active");
  signUpSection.classList.remove("active");
  mainSection.classList.remove("active");
  userInterface.classList.add("active");
  logInBtn.classList.remove("active");
  signUpBtn.classList.remove("active");
  logOutBtn.classList.add("active");
}

logInBtn.addEventListener("click", showLogInSection);
signUpBtn.addEventListener("click", showSignUpSection);
logOutBtn.addEventListener("click", showMainSection);
mainBtn.addEventListener("click", showMainSection);

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

// stringify object newUser, put it into localStorage with username as key, display message, reset form and proceed to login page
  function addNewUser() {
    let stringifiedData = JSON.stringify(newUser);                             
    localStorage.setItem(username.value, stringifiedData); 
    alert("Konto zostało utworzone");
    signUpForm.reset();
    showLogInSection();            
  }
//boolean to indicate match with localStorage
  let exists = false;
  //iterate trough all elements of localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const localStorageValue = JSON.parse(localStorage.getItem(key));
//check if email or username input matches with any localStorage element
    if (localStorageValue.email === newUser.email || localStorageValue.username === newUser.username) {
      exists = true;
      break;
    }
  }
  // display alert if email or username is already taken
  if (exists) {
    alert("Nazwa bądź adres E-mail jest już zarejestrowany.");
  } else {
    //if none is taken, try to run addNewUser()
    try {
      addNewUser();
    } catch (error) {
      console.error(error);
      alert("Wystąpił nieoczekiwany błąd");
    }
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

  //boolean to indicate match with localStorage
  let loginSuccess = false;
   //iterate trough all elements of localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const localStorageValue = JSON.parse(localStorage.getItem(key));

// check if username/email matches with password 
    if ((localStorageValue.username === username.value && localStorageValue.password === password.value) ||
        (localStorageValue.email === username.value && localStorageValue.password === password.value))
    {
      loginSuccess = true;
      break;
    }
  }
//if a match is found, display message and proceed to user's interface
  if (loginSuccess) {
    alert("Zostałeś zalogowany.")
    showUserInterface();
    logInForm.reset();
  } else 
  //if no match is found, display message
  {
    alert("Nieprawidłowa nazwa użytkownika lub hasło");
  }
}
logInForm.addEventListener("submit", logIn);
//--------------------------------------------------------------------------------------------------
  //request data from API
fetch("https://api.npoint.io/38edf0c5f3eb9ac768bd", {
    method: "GET",
  })
  //turn response from API into json
  .then(response => {
    return response.json();
  })
  //select transactions from recieved response
  .then(data => {
    data.transactions.forEach(record => {
      // for each transactions object, build following html and inject data into it
      const newRecord = `
      <ul class="transaction__details"> 
      <li class="date">${record.date}</li>
      <li class="amount">${record.amount} zł</li>
      <li class="desc">${record.description}</li>
      <li class="balance">${record.balance} zł</li>
      </ul>
        `
      
        document.querySelector(".transactions__container").insertAdjacentHTML("beforeend", newRecord)
       

      });
     
    
  });
  //----------------------------------------------------------------------------------------------

  const ctx = document.getElementById('pie__chart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

