// Bascule la nav hamburger sur mobile en ajoutant/retirant la classe "responsive"
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Deux boutons déclenchent la modale : le CTA hero desktop et le bouton mobile
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Réinitialise le formulaire et masque la confirmation pour repartir d'un état vierge à chaque ouverture
function launchModal() {
  modalbg.style.display = "block";
  document.querySelector(".modal-body").style.visibility = "visible";
  document.querySelector(".modal-confirm").style.display = "none";
  document.querySelector("form[name='reserve']").reset();
}

const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});

document.querySelector(".modal-confirm__close").addEventListener("click", () => {
  modalbg.style.display = "none";
});

// Affiche ou efface une erreur sur le wrapper .formData du champ.
// Passer null en message supprime l'erreur.
function setError(input, message) {
  const field = input.closest(".formData");
  if (message) {
    field.setAttribute("data-error", message);
    field.setAttribute("data-error-visible", "true");
  } else {
    field.removeAttribute("data-error-visible");
  }
}

// Valide tous les champs avant soumission. Retourne false pour bloquer l'envoi natif du formulaire.
// Si tout est valide, remplace le formulaire par le message de confirmation.
function validate() {
  let isValid = true;

  const first = document.getElementById("first");
  if (first.value.trim().length < 2) {
    setError(first, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    isValid = false;
  } else {
    setError(first, null);
  }

  const last = document.getElementById("last");
  if (last.value.trim().length < 2) {
    setError(last, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    isValid = false;
  } else {
    setError(last, null);
  }

  const email = document.getElementById("email");
  // Vérifie la structure "x@y.z" sans se fier uniquement au comportement natif du type="email"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    setError(email, "Veuillez entrer une adresse email valide.");
    isValid = false;
  } else {
    setError(email, null);
  }

  const birthdate = document.getElementById("birthdate");
  if (!birthdate.value) {
    setError(birthdate, "Vous devez entrer votre date de naissance.");
    isValid = false;
  } else {
    setError(birthdate, null);
  }

  const quantity = document.getElementById("quantity");
  if (quantity.value === "" || isNaN(quantity.value)) {
    setError(quantity, "Veuillez entrer un nombre valide.");
    isValid = false;
  } else {
    setError(quantity, null);
  }

  // Les radios partagent le même wrapper .formData ; on remonte via le premier radio pour cibler le wrapper
  const locationChecked = document.querySelector('input[name="location"]:checked');
  const locationField = document.querySelector('input[name="location"]').closest(".formData");
  if (!locationChecked) {
    locationField.setAttribute("data-error", "Vous devez choisir une ville.");
    locationField.setAttribute("data-error-visible", "true");
    isValid = false;
  } else {
    locationField.removeAttribute("data-error-visible");
  }

  // setError n'est pas utilisé ici car la checkbox n'a pas d'input .formData direct comme les autres champs
  const checkbox1 = document.getElementById("checkbox1");
  const checkboxField = checkbox1.closest(".formData");
  if (!checkbox1.checked) {
    checkboxField.setAttribute("data-error", "Vous devez accepter les conditions d'utilisation.");
    checkboxField.setAttribute("data-error-visible", "true");
    isValid = false;
  } else {
    checkboxField.removeAttribute("data-error-visible");
  }

  if (isValid) {
    document.querySelector(".modal-body").style.visibility = "hidden";
    document.querySelector(".modal-confirm").style.display = "flex";
  }

  return false;
}
