// MODAL
// Get modal elements
const openModalButton = document.querySelector(".add-new-book");
const modal = document.getElementById("modal");
const closeModalButton = document.querySelector(".close-btn");

// Function to open the modal
openModalButton.addEventListener("click", () => {
  modal.style.display = "flex"; // Show the modal
});

// Function to close the modal
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
});

// Close modal when clicking outside modal content
//window.addEventListener("click", (event) => {
//  if (event.target === modal) {
//    modal.style.display = "none";
//  }
//});




















// CONSTRUCTOR FUNCTION
// Array where all book inputs are stored
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

let button = document.querySelector(".modal-add-btn");

button.addEventListener("click", () => {
  let title = document.getElementById("book-title").value;
  let author = document.getElementById("author-name").value;
  let pages = document.getElementById("pages").value;
  let desctiption = document.getElementById("description").value;
  console.log("Before input check:", title, author, pages, desctiption);

  // Check for input

  let book = new Book(title, author, pages, desctiption);
  console.log("New Book Created:", book);

  // Call addBookToLibrary function
  addBookToLibrary(book);

  // Log the entire library
  console.log("Library:", myLibrary);
});
