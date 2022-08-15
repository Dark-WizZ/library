let library = [];

const bookNameIP = document.querySelector('#bookName');
const authorIP = document.querySelector('#author');
const pagesIP = document.querySelector('#pages');
const isReadIP = document.querySelector('#isRead');
let submitIP = document.querySelector('.submit');
const cards = document.querySelector('.cards');
const add = document.querySelector('.add');
const input = document.querySelector('.input');
const card = document.querySelector('.cards');

submitIP.addEventListener('click', addBook);

function Book (name, author, pages, isRead){
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = Boolean(isRead);
}

function addBook(){
  let _bookName = bookNameIP.value;
  let _author = authorIP.value;
  let _pages = pagesIP.value;
  let _isRead = (isReadIP.checked)?'read':'';
  library.push(new Book (_bookName, _author, _pages, _isRead));
  console.table(library)

  input.insertAdjacentHTML('afterend', 
            `<div class="card">
              <div class="bookName">${_bookName}</div>
              <div class="author">-${_author}</div>
              <div class="pages">Pages: ${_pages}</div>
              <div class="isRead">${(_isRead)?'Read':'Unread'}</div>
            </div>`)
}