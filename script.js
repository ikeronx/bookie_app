const $title = document.getElementById('title');
const $author = document.getElementById('author');
const $pages = document.getElementById('pages');
const $read = document.getElementById('read');
const backgroundFade = document.getElementById('overlay-back');
const addBookBtn = document.querySelector('.add-book-btn');
const modalHeader = document.querySelector('.modal__header');
const submitBtn = document.querySelector('.submit-btn');
const saveBtn = document.querySelector('.save-btn');

window.addEventListener('DOMContentLoaded', () => {
        render();
});

// book class: represents a book
class Book {
        constructor(title, author, pages, read) {
                this.title = title;
                this.author = author;
                this.pages = pages;
                this.read = read;
        }
}

// creates default books from Book Constructor, adds to library
let myLibrary = [
        {
                title: 'Dark Matter',
                author: 'Blake Crouch',
                read: 'read',
                pages: 342,
        },
        { title: '1984', author: 'George Orwell', read: 'not read', pages: 328 },
];

// adds a new book to myLibrary
function addBookToLibrary() {
        const newBook = new Book($title.value, $author.value, $pages.value, $read.value);
        myLibrary.push(newBook);

        setData();
}

// clears form after book submission
function clearForm() {
        $title.value = '';
        $author.value = '';
        $pages.value = '';
}

// Creates book visual in browser
function render() {
        const display = document.getElementById('bookShelf');
        const books = document.querySelectorAll('.book');
        books.forEach((book) => display.removeChild(book));

        for (let i = 0; i < myLibrary.length; i++) {
                createBook(myLibrary[i]);
        }
}

// creates book DOM elements, to use in render() which displays each book info on a card UI
function createBook(item) {
        const bookShelf = document.querySelector('#bookShelf');
        const bookDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        const authDiv = document.createElement('div');
        const pageDiv = document.createElement('div');
        const removeBtn = document.createElement('button');
        const readBtn = document.createElement('button');
        const updateBtn = document.createElement('button');

        bookDiv.classList.add('book');
        bookDiv.setAttribute('id', myLibrary.indexOf(item));

        titleDiv.textContent = item.title;
        titleDiv.classList.add('title');
        bookDiv.appendChild(titleDiv);

        authDiv.textContent = item.author;
        authDiv.classList.add('author');
        bookDiv.appendChild(authDiv);

        pageDiv.textContent = item.pages;
        pageDiv.classList.add('pages');
        bookDiv.appendChild(pageDiv);

        pageDiv.textContent = `${item.pages} pages`;
        pageDiv.classList.add('pages');
        bookDiv.appendChild(pageDiv);

        readBtn.classList.add('readBtn', 'button-primary', 'u-full-width');
        readBtn.style.cssText = `color: rgb(192, 183, 169);`;
        bookDiv.appendChild(readBtn);
        if (item.read === true) {
                readBtn.textContent = 'read';
        }
        if (item.read === false) {
                readBtn.textContent = 'not read';
                readBtn.style.cssText = `
        color: rgb(192, 183, 169);
        border-color: rgba(141, 4, 56, 1.103);
        background: rgba(141, 38, 20, 0.493);
        `;
        }
        if (item.read === 'read') {
                readBtn.textContent = 'read';
        }
        if (item.read === 'not read') {
                readBtn.textContent = 'not read';
                readBtn.style.cssText = `
        color: rgb(192, 183, 169);
        border-color: rgba(141, 4, 56, 1.103);
        background: rgba(141, 38, 20, 0.493);
        `;
        }

        // update book info
        bookDiv.appendChild(updateBtn);
        updateBtn.textContent = 'update';
        updateBtn.classList.add('u-full-width', 'update-btn');
        updateBtn.style.cssText = `
        color: rgb(192, 183, 169);
        background: rgba(141, 4, 56, 0.103);
        border-color: rgba(141, 38, 20, 0.493);
        `;

        removeBtn.textContent = 'remove';
        removeBtn.setAttribute('id', 'removeBtn');
        removeBtn.classList.add('u-full-width', 'remove-button');
        removeBtn.style.cssText = `
        color: rgb(192, 183, 169);
        coloackground: rgba(141, 4, 56, 0.103);r: rgb(192, 183, 169);
        `;
        bookDiv.appendChild(removeBtn);

        bookShelf.appendChild(bookDiv);

        // add toggle ability to each book 'read' button on click
        removeBtn.addEventListener('click', () => {
                myLibrary.splice(myLibrary.indexOf(item), 1);
                setData(); // saves updated array in local storage
                render();
        });

        // add toggle ability to each book 'read' button on click
        readBtn.addEventListener('click', () => {
                item.read = !item.read;
                setData(); // saves updated array in local storage
                render();
        });

        // opens modal to update book info
        updateBtn.addEventListener('click', () => {
                document.querySelector('.modal').classList.remove('modal--hidden');
                showBackgroundFade();
                modalHeader.textContent = 'Edit Book';
                submitBtn.style.display = 'none';
                saveBtn.style.display = 'inline-block';

                // populates form with current book info to update it with new info from user input
                $title.value = item.title;
                $author.value = item.author;
                $pages.value = item.pages;
                $read.value = item.read;

  
                if (item.read === true) {
                        $read.value = 'read';
                } else if (item.read === false) {
                        $read.value = 'not read';
                } else if (item.read === '') {
                        $read.value = 'not read';
                }
        });
}

// saves the updated user input on click and closes modal
saveBtn.addEventListener('click', () => {
        // removes the book from the library array and adds the updated book to the library array and saves it to local storage again with updated info from user input in the form fields in the modal window and closes the modal window after submission of the form fields in the modal window
        myLibrary.splice(myLibrary.indexOf(), 1);

        // myLibrary.shift(new Book($title.value, $author.value, $pages.value, $read.value));
        addBookToLibrary();
        setData();
        render();
        document.querySelector('.modal').classList.add('modal--hidden');
        hideBackgroundFade();
        clearForm();
});

// turns background fade on
function showBackgroundFade() {
        backgroundFade.style.display = 'block';
        backgroundFade.style.transition = 'background-color 2s';
}

// turns background fade off
const hideBackgroundFade = () => {
        backgroundFade.style.display = 'none';
        backgroundFade.style.transition = 'none';
};

// hides modal & turns off background fade
const hideModal = () => {
        document.querySelector('.modal__close-bar span').addEventListener('click', () => {
                document.querySelector('.modal').classList.add('modal--hidden');
                submitBtn.style.display = 'inline-block';
                hideBackgroundFade();
                clearForm();
        });
};
hideModal();

// add book button - modal pops up
addBookBtn.addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('modal--hidden');
        showBackgroundFade();
        modalHeader.textContent = 'Enter Book Info';
        submitBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
});

// submit btn
submitBtn.addEventListener('click', () => {
        addBookToLibrary();
        render();
        clearForm();
        hideBackgroundFade();
        document.querySelector('.modal').classList.add('modal--hidden');
});

// setting Library to be stored in local storage
function setData() {
        localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

// pulls books from local storage when page is refreshed
function restore() {
        if (!localStorage.myLibrary) {
                render();
        } else {
                let objects = localStorage.getItem('myLibrary'); // gets information from local storage to use in below loop to create DOM/display
                objects = JSON.parse(objects);
                myLibrary = objects;
                render();
        }
}
restore();
