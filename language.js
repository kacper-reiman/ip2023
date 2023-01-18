//get flag buttons
const polish = document.getElementById("polish");
const english = document.getElementById("english");
const currentLanguage = sessionStorage.getItem("language");

if (currentLanguage === "PL") {
  translateToPolish();
} else {
  translateToEnglish();
}

//event listeners to run functions
polish.addEventListener("click", translateToPolish);
english.addEventListener("click", translateToEnglish);

function translateToPolish() {
  //set language value in sessionStorage
  sessionStorage.setItem("language", "PL");
  //change document lang
  document.documentElement.lang = "pl";
  //hide and display appropriate button
  polish.style.display = "none";
  english.style.display = "block";
  document.getElementById("login__nav").textContent = "Logowanie";
  document.getElementById("signup__nav").textContent = "Rejestracja";
  document.getElementById("logout__nav").textContent = "Wyloguj się";
  document.getElementById("signup__form__title").textContent =
    "Formularz rejestracyjny";
  document.getElementById("username__label").textContent = "Nazwa użytkownika:";
  document.getElementById("username__error").textContent =
    "Pole musi zawierać co najmniej 5 liter i 1 cyfrę";
  document.getElementById("username").placeholder = "Wpisz nazwę użytkownika";
  document.getElementById("password__label").textContent = "Hasło:";
  document.getElementById("password__error").textContent =
    "Pole musi zawierać co najmniej 6 znaków";
  document.getElementById("password").placeholder = "Wpisz hasło";
  document.getElementById("email__error").textContent =
    "Pole musi mieć poprawny format E-mail";
  document.getElementById("email").placeholder = "Wpisz E-mail";
  document.getElementById("confirm__label").textContent = "Potwierdź E-mail:";
  document.getElementById("confirm__error").textContent =
    'Pole musi mieć taką samą wartość jak "E-mail"';
  document.getElementById("email__confirm").placeholder = "Potwierdź E-mail";
  document.getElementById("signup__btn").value = "Zarejestruj się";
  document.getElementById("login__form__title").textContent = "Logowanie";
  document.getElementById("login__username__label").textContent =
    "Nazwa lub E-mail:";
  document.getElementById("login__password__label").textContent = "Hasło:";
  document.getElementById("login__btn").value = "Zaloguj się";
  document.getElementById("date").textContent = "Data";
  document.getElementById("type").textContent = "Typ";
  document.getElementById("desc").textContent = "Opis";
  document.getElementById("amount").textContent = "Kwota";
  document.getElementById("balance").textContent = "Saldo";
}
function translateToEnglish() {
  sessionStorage.setItem("language", "EN");
  document.documentElement.lang = "en";
  polish.style.display = "block";
  english.style.display = "none";
  document.getElementById("login__nav").textContent = "Log In";
  document.getElementById("signup__nav").textContent = "Sign Up";
  document.getElementById("logout__nav").textContent = "Log Out";
  document.getElementById("signup__form__title").textContent = "Sign up form";
  document.getElementById("username__label").textContent = "Username:";
  document.getElementById("username__error").textContent =
    "Field must contain at least 5 letters and 1 number";
  document.getElementById("username").placeholder = "Enter username";
  document.getElementById("password__label").textContent = "Password:";
  document.getElementById("password__error").textContent =
    "Field must contain at least 6 symbols";
  document.getElementById("password").placeholder = "Enter password";
  document.getElementById("email__error").textContent =
    "Field must contain correct E-mail format";
  document.getElementById("email").placeholder = "Enter E-mail";
  document.getElementById("confirm__label").textContent = "Confirm E-mail:";
  document.getElementById("confirm__error").textContent =
    "E-mail inputs do not match";
  document.getElementById("email__confirm").placeholder = "Reenter E-mail";
  document.getElementById("signup__btn").value = "Sign up";
  document.getElementById("login__form__title").textContent = "Log in";
  document.getElementById("login__username__label").textContent =
    "Username or E-mail:";
  document.getElementById("login__password__label").textContent = "Password:";
  document.getElementById("login__btn").value = "Log in";
  document.getElementById("date").textContent = "Date";
  document.getElementById("type").textContent = "Type";
  document.getElementById("desc").textContent = "Description";
  document.getElementById("amount").textContent = "Amount";
  document.getElementById("balance").textContent = "Balance";
}
