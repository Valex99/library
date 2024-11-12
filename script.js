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

let container = document.querySelector(".grid-content");

function checkIfBookExists() {
  const bookDiv = document.querySelectorAll(".book-container");
  const noBookDiv = document.querySelector(".empty-library");

  if (bookDiv.length !== 0) {
    noBookDiv.style.display = "none";
  } else {
    noBookDiv.style.display = "flex";
  }
}

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
  clearForm(); // Clear the modal
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

  // Update the button theme
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

    displayNewBook(book);
    clearForm();
    checkIfBookExists();
  }
});

// Clear form and reset button state
function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  descriptionInput.value = "";
  modal.style.display = "none"; // Close modal after adding the book
}

// Function for dynamically creating new element
function displayNewBook(book) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  container.appendChild(bookContainer);

  const bookTitle = document.createElement("div");
  bookTitle.classList.add("new-book-title");
  bookTitle.textContent = book.title;
  bookContainer.appendChild(bookTitle);

  const authorPagesDiv = document.createElement("div");
  authorPagesDiv.classList.add("author-pages-div");
  bookContainer.appendChild(authorPagesDiv);

  const authorName = document.createElement("p");
  authorName.classList.add("new-author-name");
  authorName.textContent = book.author;
  authorPagesDiv.appendChild(authorName);

  const descriptionIconsDiv = document.createElement("div");
  descriptionIconsDiv.classList.add("description-icons-div");
  bookContainer.appendChild(descriptionIconsDiv);

  const bookDescription = document.createElement("div");
  bookDescription.classList.add("book-description");
  bookDescription.textContent = book.description;
  descriptionIconsDiv.appendChild(bookDescription);

  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icon-div");
  descriptionIconsDiv.appendChild(iconDiv);

  const checkIcon = document.createElement("img");
  checkIcon.classList.add("check-all", "icon");
  checkIcon.src = "icons/check-all.svg";
  iconDiv.appendChild(checkIcon);

  const trashIcon = document.createElement("img");
  trashIcon.classList.add("trash", "icon");
  trashIcon.src = "icons/trash-can-outline.svg";
  iconDiv.appendChild(trashIcon);

  const pagesNumber = document.createElement("p");
  pagesNumber.classList.add("new-pages-name");
  pagesNumber.textContent = "Pages: " + book.pages;
  authorPagesDiv.appendChild(pagesNumber);

  // REMOVE BOOK WHEN TRASH ICON IS CLICKED
  // Add event listener right after you create icon
  trashIcon.addEventListener("click", () => {
    // Remove the specific book container
    bookContainer.remove();
    // Each time a book is deleted, call function again to see if it was the last one
    checkIfBookExists();
  });

  checkIcon.addEventListener("click", () => {
    bookContainer.style.opacity = "0.6";
    checkIcon.style.display = "none";
    //checkIcon.remove();

    const markedIcon = document.createElement("img");
    markedIcon.classList.add("marked-icon", "icon");
    markedIcon.src = "icons/check-circle-outline.svg";
    markedIcon.style.position = "absolute";
    markedIcon.style.left = "15px";
    iconDiv.appendChild(markedIcon);

    markedIcon.addEventListener("click", () => {
      markedIcon.style.display = "none";
      checkIcon.style.display = "flex";
      bookContainer.style.opacity = "1";
    });
  });
}

// Turn icon into green color once it is marked!
