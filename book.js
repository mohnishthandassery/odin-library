let myLibrary = [];
const main = document.querySelector("div#grid");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function toggleModal() {
  const modal = document.querySelector("#modal");
  modal.classList.toggle("active");
}

function displayLibrary() {
  myLibrary.forEach((book, index) => {
    createBookCard(book, index);
  });
}

function createBookCard(book, index) {
  const div = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("btn-group");
  const readStatus = document.createElement("button");
  const remove = document.createElement("button");
  buttonGroup.append(readStatus);
  buttonGroup.append(remove);
  readStatus.addEventListener("click", (e) => {
    const doc = Array.from(e.target.attributes);
    const attributeIndex = doc.findIndex((x) => x.name === "data-attribute");
    const valueIndex = doc.findIndex((x) => x.name === "data-value");
    const element = document.querySelector(
      `button.read[${doc[attributeIndex].nodeName}="${doc[attributeIndex].nodeValue}"]`
    );
    if (doc[valueIndex].nodeValue == "true") {
      element.textContent = "Not read";
      element.setAttribute("data-value", false);
      readStatus.classList.replace("success", "danger");
    } else {
      element.textContent = "Read";
      element.setAttribute("data-value", true);
      readStatus.classList.replace("danger", "success");
    }
  });
  remove.addEventListener("click", (e) => {
    const doc = Array.from(e.target.attributes);
    const element = document.querySelector(
      `div[${doc[0].nodeName}="${doc[0].nodeValue}"]`
    );
    element.remove();
  });
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  readStatus.textContent = book.read ? "Read" : "Not read";
  readStatus.classList.add(book.read ? "success" : "danger");
  remove.textContent = "Remove";
  readStatus.classList.add("read");
  div.append(title);
  div.append(author);
  div.append(pages);
  div.append(buttonGroup);
  readStatus.setAttribute("data-attribute", index);
  readStatus.setAttribute("data-value", book.read);
  remove.setAttribute("data-attribute", index);
  div.setAttribute("data-attribute", index);
  div.classList.add("card");
  main.append(div);
}

function reRender() {
  main.innerHTML = "";
  displayLibrary();
}

// Temp
const book1 = new Book("Book 1", "Author 1", 100, true);
const book2 = new Book("Book 2", "Author 2", 200, false);
myLibrary = [book1, book2];

displayLibrary();

document.getElementById("add-book").addEventListener("click", toggleModal);

document.getElementById("add-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isRead").checked;
  addBookToLibrary(title, author, pages, isRead);
  toggleModal();
  reRender();
});

document.addEventListener("click", (e) => {
  e.stopPropagation();
  if (
    !document.getElementById("add-book").contains(e.target) &&
    !document.getElementById("modal").contains(e.target) &&
    document.getElementById("modal").classList.contains("active")
  ) {
    toggleModal();
  }
});
