
// ------------ MODAL ---------------------- //

const submitBtn = document.getElementById('submit_form')
const openModal = document.getElementById('open_modal')
const formContainer = document.getElementById('myModal')
var span = document.getElementsByClassName("close")[0]

openModal.onclick = function() {
    formContainer.style.display = "block";
}

span.onclick = function() {
    formContainer.style.display = "none";
}

formContainer.onsubmit = function() {
    formContainer.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == formContainer) {
        formContainer.style.display = "none";
    }
}

// -----------------CLASSES----------------- // 
class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }   
}


// -----------------     UI    ----------------- // 

class UI {
    static displayBooks() {

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book))
    }

// ----------- DISPLAY-BOOK --------------------- //

    static addBookToList(book) {
        const list = document.getElementById("books");

        const Newdiv = document.createElement('tr')
        
        Newdiv.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td class="NotRead"> ${book.isRead ? 'Read' : 'Is not read yet' } </td>
            <td><a href="#" class="btn-delete">X</a></td>
            `;

        list.appendChild(Newdiv);
    }

    static deleteBook(el) {
        if(el.classList.contains('btn-delete')) {  
          el.parentElement.parentElement.remove();
        }
      }

    static toggleRead() {
    let ReadCheck = document.querySelector(".NotRead")
        ReadCheck.classList.remove("NotRead")
        ReadCheck.classList.add("Read")
    }

    static clearfields() {
        document.querySelector('#name').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#isRead').checked = false;
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks(){
        let books
        if(localStorage.getItem('books') === null) {
            books= []
        }else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }

    static addBook(book){
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(title) {
        const books = Store.getBooks();
    
        books.forEach((book, index) => {
          if(book.title.value === title.value) {
            books.splice(index, 1);
          }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// ---------------------ADD-BOOK-------------------------//

document.getElementById('book-form').addEventListener('submit', (e) => {
    // Prevent actual state 
    e.preventDefault()
    
    //Get form values
    const title = document.getElementById('name').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead')

    // Validate
     if(title === '' || author === '' || pages === '') {
        alert('please fill all fields')
     } else {
    
    // Instatiate book
    const book = new Book(title, author, pages, isRead.checked)

    // Add book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book)

    // Clear fields
    UI.clearfields();

    }
});

    //Remove a book
    document.getElementById('books').addEventListener('click', (e) => {

    // Toogle Read
    UI.toggleRead(e.target)

    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from Store
    Store.removeBook(e.target.parentElement.textContent);
})




