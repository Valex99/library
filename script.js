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

// Function to close the modal on backdrop click
// event is used to  access properties like event.target (to check where the click happened)
// When it doesn't matter where click happens, ("click", () => can be used
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    // Check if the click is directly on the modal (backdrop)
    modal.style.display = "none";
    clearForm();
  }
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
// Initialize library from local storage or as an empty array
let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

// Check if there are saved books in localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  loadBooksFromStorage();
  checkIfBookExists(); // Update the empty library message based on loaded books
});

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
  saveBooksToStorage(); // Save updated library to localStorage
}

// Function to save books to localStorage
function saveBooksToStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// Function to load books from localStorage
function loadBooksFromStorage() {
  const storedBooks = localStorage.getItem("myLibrary");
  if (storedBooks) {
    myLibrary = JSON.parse(storedBooks);
    myLibrary.forEach((book) => displayNewBook(book)); // Display each book
  }
}

// Add book when button is clicked

addButton.addEventListener("click", () => {
  const root = document.documentElement;
  if (root.className === "valid") {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const description = descriptionInput.value;

    const book = new Book(title, author, pages, description);
    addBookToLibrary(book);

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

  // Remove book when trash icon is clicked
  trashIcon.addEventListener("click", () => {
    bookContainer.remove();
    myLibrary = myLibrary.filter((b) => b.title !== book.title); // Remove from array
    saveBooksToStorage(); // Update localStorage
    // Each time a book is deleted, call function again to see if any books still exist
    checkIfBookExists();
  });

  checkIcon.addEventListener("click", () => {
    bookContainer.style.opacity = "0.5";
    // Hide first icon - set display to none
    checkIcon.style.display = "none";

    // Create new icon
    const markedIcon = document.createElement("div");
    markedIcon.classList.add("icon");
    markedIcon.style.position = "absolute";

    // Insert SVG code into the div as innerHTML
    markedIcon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
</svg>
`;
    const svgIcon = markedIcon.querySelector("svg");
    svgIcon.classList.add("marked-icon");
    iconDiv.appendChild(markedIcon);

    // Unselect the book (remove from marked list)
    markedIcon.addEventListener("click", () => {
      markedIcon.style.display = "none";
      checkIcon.style.display = "flex";
      bookContainer.style.opacity = "1";
    });
  });
}
