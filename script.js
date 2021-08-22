const $title = document.getElementById('title')
const $author = document.getElementById('author')
const $pages = document.getElementById('pages')
const $read = document.getElementById('read')
const $submit = document.getElementById('submit')
const $tableBody = document.querySelector("#book-table-body");
const $form = document.getElementById('add-book-form').addEventListener("submit", (e) => {
    //modal submit book event 
    e.preventDefault()
    addBookToLibrary()
    render()
    clearForm()
    toggleModal()
})

//book class: represents a book
class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

//creates book from Book Constructor, adds to library
let myLibrary = [
    { title: "Dark Matter", author: "Blake Crouch", pages: 342, read: 'read' },
    {
    title: `Words of Radiance
    (The Stormlight Archive #2)`,
    author: "Brandon Sanderson",
    pages: 244,
    read: 'not read',
    },
    { title: `The Stone Sky
    (The Broken Earth #3)`, author: "N.K. Jemisin", pages: 153, read: 'not read' },
];

//adds a new book to myLibrary
function addBookToLibrary() {
    let newBook
    newBook = new Book($title.value, $author.value, $pages.value, $read.value)
    myLibrary.push(newBook) 
}

//clears form after book submission
function clearForm() {
    $title.value = ""
    $author.value = ""
    $pages.value = ""
  }

// displays the new book  
function render() {
    // checkLocalStorage();
    $tableBody.textContent = ""
    myLibrary.forEach((book) => {
      const htmlBook = `
        <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td><button class="status-button">${book.read}</button></td>
          <td><button class="delete">delete</button></td>
        </tr>
        `;
      $tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    });
  }
render();

// modal toggle function
const toggleModal = () => {
    document.querySelector('.modal')
    .classList.toggle('modal--hidden')
}

    //event listener to toggle modal on 
    document.querySelector('#show-modal')
        .addEventListener('click', toggleModal)

    //modal close bar
    document.querySelector('.modal__close-bar span')
        .addEventListener('click', toggleModal)







    // //saving to local storage
    // // localStorage.setItem('MyBookShelf', JSON.stringify(myLibrary))
