let library = [];

const bookNameIP = document.querySelector('#bookName');
const authorIP = document.querySelector('#author');
const pagesIP = document.querySelector('#pages');
const isReadIP = document.querySelector('#isRead');
let submitIP = document.querySelector('.submit');
const cards = document.querySelectorAll('.cards');
const add = document.querySelector('.add');
const input = document.querySelector('.input');
let card = document.querySelector('.card');
let remove = document.querySelectorAll('.remove');

submitIP.addEventListener('click', addBook);

function removeElem(){
  let list = this.parentElement.classList.value;
  let index = list.split(' ')[2].split('=')[1];
  let i = index.slice(1, 2);
  library.splice(i, 1);
  this.parentElement.remove();
}

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
   if (card) card.forEach((c)=>{c.remove()})
  updateView();
  clearIP();
}

function clearIP(){
  bookNameIP.value = '';
  authorIP.value = '';
  pagesIP.value = '';
}

function updateView(){
  count=0;
  library.forEach((book)=>{
    let _bookName = book.name;
    let _author = book.author;
    let _pages = book.pages;
    let _isRead = book.isRead;
    input.insertAdjacentHTML('afterend', 
            `<div class="card ${(_isRead)?'read':'Unread'} index='${count}'">
              <div class="bookName">${_bookName?_bookName:'Title Undefined'}</div>
              <div class="author">by<br>${_author?_author:'Author Undefined'}</div>
              <div class="pages">Pages: ${_pages?_pages:'undefined'}</div>
              <div class="isRead">${(_isRead)?'Read':'Unread'}</div>
              <img src="img/delete.svg" alt="remove" class="remove"></img>
              <img src="img/edit.svg" alt="edit" class="edit"></img>
            </div>`)
    count++;
  })

  card = document.querySelectorAll('.card');
  remove = document.querySelectorAll('.remove');
  remove.forEach((r)=>{
    r.addEventListener('click', removeElem)
  })
}