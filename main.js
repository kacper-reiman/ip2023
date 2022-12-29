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
  // checks if username is taken, działa przy wpisywaniu pojedynczo, teraz chyba trzeba sie jakoś dostać do obiektu newUser
  if (localStorage.getItem("username", username.value) == username.value) {
    alert("Podana nazwa użytkownika już istnieje");
  }
  // checks if email is already registered, to co wyżej
  else if (localStorage.getItem("email", email.value) == email.value) {
    alert("Podany Email jest już zarejestrowany");
  }
  // creates new user as an object, dane nadpisuja sie przy każdym submicie, chyba trzeba je jakoś wypushować zamiast setItem
  else {
    const newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    let json = JSON.stringify(newUser);
    localStorage.setItem(username, json);

    signUpForm.reset();
    event.preventDefault();
  }
}
signUpForm.addEventListener("submit", signUp);

// localStorage.setItem("username", username.value);
// localStorage.setItem("email", email.value);
// localStorage.setItem("password", password.value);
