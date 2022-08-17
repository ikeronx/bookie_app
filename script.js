/* eslint-disable no-use-before-define */
const $title = document.getElementById('title');
const $author = document.getElementById('author');
const $pages = document.getElementById('pages');
const $read = document.getElementById('read');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const addBookBtn = document.querySelector('.add-book-btn');
const modalHeader = document.querySelector('.modal__header');
const submitBtn = document.querySelector('.submit-btn');
const saveBtn = document.querySelector('.save-btn');
const xModalClose = document.querySelector('.x-modal__close');
const errorMsg = document.querySelector('.modal__error-msg');

// book class: represents a book
class Book {
        constructor(title, author, pages, read) {
                this.title = title;
                this.author = author;
                this.pages = pages;
                this.read = read;
        }
}

// test data - books created using the Book class above and added to myLibrary array
let myLibrary = [
        {
                title: 'Grit',
                author: 'Angela Duckworth',
                read: 'read',
                pages: 277,
        },
        { title: 'Atomic Habits', author: 'James Clear', read: 'not read', pages: 32 },
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

// creates book visual in browser from Book Constructor object and adds to DOM (bookShelf) element in index.html file
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

        // add toggle ability to each book 'read' button on click
        readBtn.addEventListener('click', () => {
                item.read = !item.read;
                setData(); // saves updated array in local storage
                render();
        });

        // updates book info
        bookDiv.appendChild(updateBtn);
        updateBtn.textContent = 'update';
        updateBtn.classList.add('u-full-width', 'update-btn');
        updateBtn.style.cssText = `
        color: rgb(192, 183, 169);
        background: rgba(141, 4, 56, 0.103);
        border-color: rgba(141, 38, 20, 0.493);
        `;

        // opens modal form to update book info
        updateBtn.addEventListener('click', () => {
                setTimeout(() => {
                        modal.classList.remove('modal--hidden');
                        modal.classList.add('fade-in');
                }, 100);
                // eslint-disable-next-line no-use-before-define
                showOverlay();
                modalHeader.textContent = 'Edit Book';
                submitBtn.style.display = 'none';
                saveBtn.style.display = 'inline-block';

                // populates form with current book info to update it with new info from user input
                $title.value = item.title;
                $author.value = item.author;
                $pages.value = item.pages;
                $read.value = item.read;

                // checks if book is read or not and changes readBtn text accordingly to reflect current state of book info change in form input fields
                if (item.read === true) {
                        $read.value = 'read';
                } else if (item.read === false) {
                        $read.value = 'not read';
                } else if (item.read === '') {
                        $read.value = 'not read';
                }
        });

        // removes book from library
        removeBtn.textContent = 'remove';
        removeBtn.setAttribute('id', 'removeBtn');
        removeBtn.classList.add('u-full-width', 'remove-button');
        removeBtn.style.cssText = `
        color: rgb(192, 183, 169);
        border-color: rgba(141, 38, 20, 0.493);
        `;

        // adds toggle ability to each book 'read' button on click
        bookDiv.appendChild(removeBtn);
        removeBtn.addEventListener('click', () => {
                myLibrary.splice(myLibrary.indexOf(item), 1);
                setData(); // saves updated array in local storage
                render();
        });
        bookShelf.appendChild(bookDiv);
}

// adds background fade to modal window
function showOverlay() {
        overlay.style.display = 'block';
        overlay.style.transition = 'background-color 2s';
}

// removes background fade from modal window
const removeOverlay = () => {
        overlay.style.display = 'none';
        overlay.style.transition = 'none';
        overlay.style.display = 'none';
};

// hides modal & removes background fade
function removeModal() {
        modal.classList.add('fade-out');
        setTimeout(() => {
                modal.classList.remove('fade-out');
                modal.classList.add('modal--hidden');
                removeOverlay();
        }, 900);

        if (modal.classList.contains('fade-in')) {
                modal.classList.remove('fade-in');
        }
        submitBtn.style.display = 'inline-block';
        clearForm();
}
// removes modal by click outside of modal window or by clicking on 'X' button in modal window
xModalClose.addEventListener('click', removeModal);
overlay.addEventListener('click', removeModal);


// add book button - modal with form pops up to add a new book to the library array and saves it to local storage again with new info from user input in the form fields in the modal window and closes the modal window after submission of the form fields in the modal window
addBookBtn.addEventListener('click', () => {
        setTimeout(() => {
                modal.classList.remove('modal--hidden');
                modal.classList.add('fade-in');
        }, 100);
        showOverlay();
        modalHeader.textContent = 'Enter Book Info';
        submitBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
});

// submit btn
submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // checks if user input is empty and if so, alerts user to fill out all fields in the form
        if ($title.value === '' || $author.value === '' || $pages.value === '') {
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Please fill out all fields';
                // removes error message after 3 seconds
                setTimeout(() => {
                        errorMsg.style.display = 'none';
                }, 3000);
        } else {
                addBookToLibrary();
                setData();
                render();
                removeModal();
        }
});

// saves the updated user input on click and closes modal
saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // removes the book from the library array and adds the updated book to the library array and saves it to local storage again with updated info from user input in the form fields in the modal window and closes the modal window after submission of the form fields in the modal window
        // findIndex
        if ($title.value === '' || $author.value === '' || $pages.value === '') {
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Please fill out all fields';
                // removes error message after 3 seconds
                setTimeout(() => {
                        errorMsg.style.display = 'none';
                }, 3000);
        } else {
                myLibrary.splice(myLibrary.indexOf(0), 1);
                addBookToLibrary();
                setData();
                render();
                clearForm();
                removeModal();
        }
});

// sets books in myLibrary array to be stored in local storage
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
