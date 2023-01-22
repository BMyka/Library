let isRendered = false;

const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.toggleReadStatus = function () {
  this.readStatus = !this.readStatus;
};

function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

function toggleForm() {
  const form = document.getElementById("addNewBookForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

const addNewBookButton = document.querySelector(".addNewBook");
addNewBookButton.addEventListener("click", toggleForm);
displayBooks();
const bookContainer = document.querySelector(".books");
bookContainer.addEventListener("click", handleReadButtonClick);
const form = document.getElementById("addNewBookForm").querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = form.querySelector("input[placeholder='Title']").value;
  const author = form.querySelector("input[placeholder='Author']").value;
  const pages = form.querySelector("input[placeholder='Pages']").value;
  const readStatus = form.querySelector("input[name='read']").checked;

  addBookToLibrary(title, author, pages, readStatus);
  displayBooks();
  toggleForm();
});

function handleReadButtonClick(e) {
  if (e.target.classList.contains("read")) {
    const { index } = e.target.parentElement.parentElement.dataset;
    const book = myLibrary[index];
    book.toggleReadStatus();
    e.target.innerText = book.readStatus ? "Read" : "Not Read";
    e.target.style.backgroundColor = book.readStatus ? "#55D6C2" : "#F49097";
  } else if (e.target.classList.contains("remove")) {
    const index = e.target.parentNode.parentNode.getAttribute("data-index");
    myLibrary.splice(index, 1);
    e.target.parentNode.parentNode.remove();
  }
}

function displayBooks() {
  if (!isRendered) {
    const bookContainer = document.querySelector(".books");
    myLibrary.forEach((book, index) => {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
      bookElement.setAttribute("data-index", index);
      const bookList = document.createElement("ul");

      const title = document.createElement("li");
      title.innerText = `“${book.title}”`;
      bookList.appendChild(title);

      const author = document.createElement("li");
      author.innerText = book.author;
      bookList.appendChild(author);

      const pages = document.createElement("li");
      pages.innerText = book.pages;
      bookList.appendChild(pages);

      const readButton = document.createElement("button");
      readButton.classList.add("read");
      readButton.innerText = book.readStatus ? "Read" : "Not Read";
      readButton.style.backgroundColor = book.readStatus
        ? "#55D6C2"
        : "#F49097";
      bookList.appendChild(readButton);

      const removeButton = document.createElement("button");
      removeButton.classList.add("remove");
      removeButton.innerText = "Remove";

      bookList.appendChild(removeButton);
      bookElement.appendChild(bookList);
      bookContainer.appendChild(bookElement);
    });
    isRendered = true;
  } else {
    const lastBook = myLibrary[myLibrary.length - 1];
    const bookContainer = document.querySelector(".books");
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.setAttribute("data-index", myLibrary.length - 1);
    const bookList = document.createElement("ul");

    const title = document.createElement("li");
    title.innerText = `“${lastBook.title}”`;
    bookList.appendChild(title);

    const author = document.createElement("li");
    author.innerText = lastBook.author;
    bookList.appendChild(author);

    const pages = document.createElement("li");
    pages.innerText = lastBook.pages;
    bookList.appendChild(pages);

    const readButton = document.createElement("button");
    readButton.classList.add("read");
    readButton.innerText = lastBook.readStatus ? "Read" : "Not Read";
    readButton.style.backgroundColor = lastBook.readStatus
      ? "#55D6C2"
      : "#F49097";
    bookList.appendChild(readButton);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.innerText = "Remove";
    bookList.appendChild(removeButton);

    bookElement.appendChild(bookList);
    bookContainer.appendChild(bookElement);
  }
}
