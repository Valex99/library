// Get modal elements
const openModalButton = document.querySelector(".add-new-book");
const modal = document.getElementById("modal");
const closeModalButton = document.querySelector(".close-btn");

// Form elements
let addButton = document.querySelector(".modal-add-btn");
let titleInput = document.getElementById("book-title");
let authorInput = document.getElementById("author-name");
let pagesInput = document.getElementById("pages");
let descriptionInput = document.getElementById("description");

// Function to open the modal
openModalButton.addEventListener("click", () => {
  modal.style.display = "flex"; // Show the modal
  // Set initial state of modal button to inavlid
  const root = document.documentElement;
  root.className = "invalid";
});

// Function to close the modal
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
});

let validity = false;

function validateForm() {
  const isTitleValid = titleInput.value.trim() !== ""; // Title should not be empty
  const isAuthorValid = authorInput.value.trim() !== ""; // Author should not be empty
  const isPagesValid =
    pagesInput.value.trim() !== "" && !isNaN(pagesInput.value);
  const isDescriptionValid = descriptionInput.value.trim().length >= 10; // Description should be at least 10 chars

  // Enable button only if all fields are valid
  validity =
    isTitleValid && isAuthorValid && isPagesValid && isDescriptionValid;

  // Set button disabled state based on validity
  //addButton.disabled = validity;

  // Update the theme
  setTheme();
}

function setTheme() {
  const root = document.documentElement;

  // Choose theme based on the boolean state of `validity`
  const newTheme = validity ? "valid" : "invalid";
  root.className = newTheme;
}

// Attach 'input' event listeners to each field to validate the form in real-time
titleInput.addEventListener("input", validateForm);
authorInput.addEventListener("input", validateForm);
pagesInput.addEventListener("input", validateForm);
descriptionInput.addEventListener("input", validateForm);

// Array to store book data
const myLibrary = [];

// Constructor function for creating new book
function Book(title, author, pages, description) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.description = description;
}

// Function that adds book into myLibrary array
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Add book when button is clicked
addButton.addEventListener("click", () => {
  const root = document.documentElement;
  console.log(root.className);
  if (root.className === "valid") {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const description = descriptionInput.value;

    const book = new Book(title, author, pages, description);
    addBookToLibrary(book);

    console.log("New Book Created:", book);
    console.log("Library:", myLibrary);

    // Clear form and reset button state
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    descriptionInput.value = "";
    modal.style.display = "none"; // Close modal after adding the book
  }
});
