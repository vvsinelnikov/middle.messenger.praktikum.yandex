import './login.css';

form = document.querySelector(".login__form");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log(evt);
});