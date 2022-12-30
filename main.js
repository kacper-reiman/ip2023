const logInBtn = document.getElementById("login__nav");
const logInSection = document.querySelector(".login__card");

const signUpBtn = document.getElementById("signup__nav");
const signUpSection = document.querySelector(".signup__card");

const logOutBtn = document.getElementById("logout__nav");
const mainSection = document.querySelector(".main__card");

const mainBtn = document.getElementById("intive__logo");

function showLogInSection() {
  mainSection.classList.remove("active");
  signUpSection.classList.remove("active");
  logInSection.classList.add("active");
  signUpBtn.classList.add("active");
  logInBtn.classList.remove("active");
  logOutBtn.classList.remove("active");
}

function showSignUpSection() {
  mainSection.classList.remove("active");
  logInSection.classList.remove("active");
  signUpSection.classList.add("active");
  logInBtn.classList.add("active");
  logOutBtn.classList.remove("active");
  signUpBtn.classList.remove("active");
}

function showMainSection() {
  logInSection.classList.remove("active");
  signUpSection.classList.remove("active");
  mainSection.classList.add("active");
  logInBtn.classList.add("active");
  signUpBtn.classList.add("active");
}

logInBtn.addEventListener("click", showLogInSection);
signUpBtn.addEventListener("click", showSignUpSection);
logOutBtn.addEventListener("click", showMainSection);
mainBtn.addEventListener("click", showMainSection);

// ---------------------------------------------------------------------------
// form inputs
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
// signup form
const signUpForm = document.getElementById("signup");

function signUp(event) {
  const newUser = {                                                             //tworzy obiekt który zbiera wartości z inputów
    username: username.value,
    email: email.value,
    password: password.value,
  };
  function addNewUser() {
    let stringifiedData = JSON.stringify(newUser);                              // obiekt zamienia na string
    localStorage.setItem(username.value, stringifiedData);                      // wrzuca string do localStorage, key = nazwa użytkownika
  }
  const getUserData = localStorage.getItem(username.value);                     // pobiera z localStorage wartość przypisana dla nazwy uzytkownika
  if (JSON.parse(getUserData) == null) {                                        //jeśli localStorage jest puste => addNewUser();
    addNewUser();
  } else if (Object.values(newUser)[0] == JSON.parse(getUserData).username) {   // jeśli wartość username z inputu jest już w localStorage => alert
    alert("Podana nazwa użytkownika już istnieje");
  } else if (Object.values(newUser)[1] == JSON.parse(getUserData).email) {      // jeśli email z inputu jest już w localStorage => alert - NIE DZIAŁA
    alert("Podany Email jest już zarejestrowany");
  } else {                                                                      // jeśli wszystko ok => addNewUser();
    addNewUser();
  }
   //funkcja 
  event.preventDefault();
  console.log(Object.values(newUser)[0]);                                       //wyrzuca 1 wartość z obiektu newUser - username
  console.log(JSON.parse(getUserData).username);                                //wyrzuca username z local storage, jeśli jest pusty - błąd JSON.parse is null
  console.log(Object.values(newUser)[1]);                                       //wyrzuca 2 wartość z obiektu newUser - email
  console.log(JSON.parse(getUserData).email);                                   //wyrzuca email z local storage 
}
signUpForm.addEventListener("submit", signUp);                                  // event listener formularza

// signUpForm.reset(); 
//   console.log(Object.values(getName)[0]);
// localStorage.setItem("username", username.value);
// localStorage.setItem("email", email.value);
// localStorage.setItem("password", password.value);
