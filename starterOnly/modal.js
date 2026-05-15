function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});

// Show or hide an error on a formData element
function setError(input, message) {
  const field = input.closest(".formData");
  if (message) {
    field.setAttribute("data-error", message);
    field.setAttribute("data-error-visible", "true");
  } else {
    field.removeAttribute("data-error-visible");
  }
}

function validate() {
  let isValid = true;

  // Prénom
  const first = document.getElementById("first");
  if (first.value.trim().length < 2) {
    setError(first, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    isValid = false;
  } else {
    setError(first, null);
  }

  // Nom
  const last = document.getElementById("last");
  if (last.value.trim().length < 2) {
    setError(last, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    isValid = false;
  } else {
    setError(last, null);
  }

  // Email
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    setError(email, "Veuillez entrer une adresse email valide.");
    isValid = false;
  } else {
    setError(email, null);
  }

  // Date de naissance
  const birthdate = document.getElementById("birthdate");
  if (!birthdate.value) {
    setError(birthdate, "Vous devez entrer votre date de naissance.");
    isValid = false;
  } else {
    setError(birthdate, null);
  }

  // Nombre de tournois
  const quantity = document.getElementById("quantity");
  if (quantity.value === "" || isNaN(quantity.value)) {
    setError(quantity, "Veuillez entrer un nombre valide.");
    isValid = false;
  } else {
    setError(quantity, null);
  }

  // Ville (radio)
  const locationChecked = document.querySelector('input[name="location"]:checked');
  const locationField = document.querySelector('input[name="location"]').closest(".formData");
  if (!locationChecked) {
    locationField.setAttribute("data-error", "Vous devez choisir une ville.");
    locationField.setAttribute("data-error-visible", "true");
    isValid = false;
  } else {
    locationField.removeAttribute("data-error-visible");
  }

  // Conditions d'utilisation
  const checkbox1 = document.getElementById("checkbox1");
  const checkboxField = checkbox1.closest(".formData");
  if (!checkbox1.checked) {
    checkboxField.setAttribute("data-error", "Vous devez accepter les conditions d'utilisation.");
    checkboxField.setAttribute("data-error-visible", "true");
    isValid = false;
  } else {
    checkboxField.removeAttribute("data-error-visible");
  }

  return isValid;
}
