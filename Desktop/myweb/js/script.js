console.log("script loaded");
// ===== Helper: safely get an element =====
function $(id) {
  return document.getElementById(id);
}

// ===== Contact form validation and preview =====
const form = $("contact-form");
const nameInput = $("name");
const emailInput = $("email");
const messageInput = $("message");
const preview = $("form-preview");

// Shows or clears an error message next to a field
function setError(input, errorId, message) {
  $(errorId).textContent = message;
  input.classList.toggle("invalid", message !== "");
}

// Checks all three fields; returns true only if all are valid
function validateForm() {
  let valid = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "") {
    setError(nameInput, "name-error", "Please enter your name (spaces only is not allowed).");
    valid = false;
  } else {
    setError(nameInput, "name-error", "");
  }

  if (!emailPattern.test(email)) {
    setError(emailInput, "email-error", "Please enter a valid email, e.g. name@example.com.");
    valid = false;
  } else {
    setError(emailInput, "email-error", "");
  }

  if (message === "") {
    setError(messageInput, "message-error", "Please enter a message (spaces only is not allowed).");
    valid = false;
  } else {
    setError(messageInput, "message-error", "");
  }

  return valid;
}

// Builds a local preview using textContent (safe for user-entered text)
function showPreview(name, email, message) {
  preview.textContent = "";

  const heading = document.createElement("h3");
  heading.textContent = "Form validated successfully";

  const note = document.createElement("p");
  note.textContent = "Your details passed validation. This is a browser demonstration only; no message was sent.";

  const nameP = document.createElement("p");
  nameP.textContent = "Name: " + name;

  const emailP = document.createElement("p");
  emailP.textContent = "Email: " + email;

  const messageP = document.createElement("p");
  messageP.textContent = "Message: " + message;

  preview.append(heading, note, nameP, emailP, messageP);
}

if (form) {
  // Runs when the form is submitted
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // keep everything local, no page reload

    if (validateForm()) {
      showPreview(nameInput.value.trim(), emailInput.value.trim(), messageInput.value.trim());
    } else {
      preview.textContent = "";
    }
  });
}

// ===== Gallery viewer =====
// Change these to your real image files, alt text and captions
const photos = [
  { src: "images/photo1.jpg", alt: "Description of photo 1", caption: "Caption for photo 1" },
  { src: "images/photo2.jpg", alt: "Description of photo 2", caption: "Caption for photo 2" },
  { src: "images/photo3.jpg", alt: "Description of photo 3", caption: "Caption for photo 3" }
];
let currentPhoto = 0;

const galleryImg = $("gallery-img");
const galleryCaption = $("gallery-caption");
const galleryCount = $("gallery-count");

// Updates image, caption and counter for the chosen photo
function showPhoto(index) {
  // wrap around at the first and last photo
  if (index < 0) index = photos.length - 1;
  if (index >= photos.length) index = 0;
  currentPhoto = index;
  galleryImg.src = photos[index].src;
  galleryImg.alt = photos[index].alt;
  galleryCaption.textContent = photos[index].caption;
  galleryCount.textContent = (index + 1) + " of " + photos.length;
}

if ($("prev-btn") && $("next-btn")) {
  $("prev-btn").addEventListener("click", function () { showPhoto(currentPhoto - 1); });
  $("next-btn").addEventListener("click", function () { showPhoto(currentPhoto + 1); });
}

// ===== Theme switch =====
const themeBtn = $("theme-toggle");

// Toggles the dark class on body and updates the button label and state
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  themeBtn.textContent = isDark ? "Light mode" : "Dark mode";
  themeBtn.setAttribute("aria-pressed", isDark);
}

if (themeBtn) {
  themeBtn.addEventListener("click", toggleTheme);
}

// ===== Mobile navigation =====
const menuBtn = $("menu-toggle");
const navLinks = $("nav-links");

// Opens or closes the menu and updates the button's state
function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
  menuBtn.textContent = isOpen ? "Close ✕" : "Menu ☰";
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", toggleMenu);

  // Close the menu after a link is chosen
  navLinks.addEventListener("click", function (event) {
    if (event.target.tagName === "A" && navLinks.classList.contains("open")) {
      toggleMenu();
    }
  });
}