const $title = document.getElementById('title')
const $author = document.getElementById('author')
const $pages = document.getElementById('pages')
const $read = document.getElementById('read')
const $submit = document.getElementById('submit')
const backgroundFade = document.getElementById('overlay-back')
const $form = document.getElementById('modal-popup').addEventListener("submit", (e) => {
    e.preventDefault()
    addBookToLibrary()
    render()
    clearForm()
    toggleModal()
    hideBackgroundFade()
})

window.addEventListener('DOMContentLoaded', () => {
  render();
});

//book class: represents a book
class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

//creates default books from Book Constructor, adds to library
let myLibrary = [
  { title: 'The Fifth Season', author: 'N.K. Jemisin', read: "read", pages: 419 },
  {
    title: "Dark Matter",
    author: "Blake Crouch",
    read: "read",
    pages: 342,
  },
  { title: 'Nineteen Eighty-Four', author: 'Geroge Orwell', read: 'read', pages: 328 },
  { title: 'A Brief History Of Seven Killings', author: 'Marlon James', read: 'not read', pages: 609},
];

//adds a new book to myLibrary
function addBookToLibrary() {
    let newBook
    newBook = new Book($title.value, $author.value, $pages.value, $read.value)
    myLibrary.push(newBook)


  setData()

}

//clears form after book submission
function clearForm() {
    $title.value = ''
    $author.value = ''
    $pages.value = ''
}
  
//Creates book visual in browser
function render() {
  const display = document.getElementById('bookShelf')
  const books = document.querySelectorAll('.book')
  books.forEach(book => display.removeChild(book))

  for (let i = 0; i < myLibrary.length; i++) {
      createBook(myLibrary[i])
  }
}
  
//creates book DOM elements, to use in render() which displays each book info on a card UI
function createBook(item) {
  const bookShelf = document.querySelector('#bookShelf')
  const bookDiv = document.createElement('div')
  const titleDiv = document.createElement('div')
  const authDiv = document.createElement('div')
  const pageDiv = document.createElement('div')
  const removeBtn = document.createElement('button')
  const readBtn = document.createElement('button')

  bookDiv.classList.add('book')
  bookDiv.setAttribute('id', myLibrary.indexOf(item))

  titleDiv.textContent = item.title
  titleDiv.classList.add('title')
  bookDiv.appendChild(titleDiv)

  authDiv.textContent = item.author
  authDiv.classList.add('author')
  bookDiv.appendChild(authDiv)

  pageDiv.textContent = item.pages
  pageDiv.classList.add('pages')
  bookDiv.appendChild(pageDiv)

  pageDiv.textContent = item.pages + ' pages'
  pageDiv.classList.add('pages')
  bookDiv.appendChild(pageDiv)

  readBtn.classList.add('readBtn', 'button-primary', 'u-full-width')
  readBtn.style.cssText = `color: rgb(192, 183, 169);`
  bookDiv.appendChild(readBtn)
  if (item.read === true) {
    readBtn.textContent = 'read'
  } if (item.read === false) {
    readBtn.textContent = 'not read'
    readBtn.style.cssText = `
    color: rgb(192, 183, 169);
    border-color: rgba(141, 4, 56, 1.103);
    background: rgba(141, 38, 20, 0.493);
    `
  }  if (item.read === 'read') {
    readBtn.textContent = 'read'
  } if (item.read === 'not read') {
    readBtn.textContent = 'not read'
    readBtn.style.cssText = `
      color: rgb(192, 183, 169);
      border-color: rgba(141, 4, 56, 1.103);
      background: rgba(141, 38, 20, 0.493);
      `
  }
  
  removeBtn.textContent = 'remove'
  removeBtn.setAttribute('id', 'removeBtn')
  removeBtn.classList.add('button-primary', 'u-full-width', 'remove-button')
  removeBtn.style.cssText = `
    color: rgb(192, 183, 169);
    background: rgba(141, 4, 56, 0.103);
    border-color: rgba(141, 38, 20, 0.493);
    `
  bookDiv.appendChild(removeBtn)

  bookShelf.appendChild(bookDiv)

  //add toggle ability to each book 'read' button on click
  removeBtn.addEventListener('click', () => {
      myLibrary.splice(myLibrary.indexOf(item), 1)
      setData();  //saves updated array in local storage
      render()
  })

  //add toggle ability to each book 'read' button on click
  readBtn.addEventListener('click', () => {
      item.read = !item.read
      setData();  //saves updated array in local storage
      render()
  })
}

// modal popup toggle function
const toggleModal = () => {
    document.querySelector('.modal')
      .classList.toggle('modal--hidden')
}

//event listener to toggle modal on and fade background
let showModal = () => {
  document.querySelector('#show-modal-add-book-btn')
    .addEventListener('click', toggleModal)
  
  document.querySelector('#show-modal-add-book-btn')
    .addEventListener('click', () => {
      showBackgroundFade()
    })
}
showModal()

//hides modal & turns off background fade
let hideModal = () => {
  document.querySelector('.modal__close-bar span')
    .addEventListener('click', toggleModal)

  document.querySelector('.modal__close-bar span')
    .addEventListener('click', () => {
      hideBackgroundFade()
    })
}
hideModal()

// turns background fade on 
function showBackgroundFade() {
  backgroundFade.style.display = 'block'
  backgroundFade.style.transition = 'background-color 2s'
}

//turns background fade off
let hideBackgroundFade = () => {
  backgroundFade.style.display = 'none'
  backgroundFade.style.transition = 'none'
}

// setting Library to be stored in local storage
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}
  
//pulls books from local storage when page is refreshed
function restore() {
  if(!localStorage.myLibrary) {
      render();
  }else {
      let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
      objects = JSON.parse(objects);
      myLibrary = objects;
      render();
  }
}
restore();