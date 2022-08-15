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
let edit = document.querySelectorAll('.edit');
let readButton = document.querySelectorAll('button.isRead')

submitIP.addEventListener('click', addBook);

function toggleRead(){
  let i = indByElem.apply(this);
  library[i].toggleRead();
}

function readMouseOver(){
  let def = this.parentElement.style.borderLeft;
  if(this.textContent=='Read'){
    this.parentElement.style.borderColor = 'rgb(221, 202, 0)';
  }else{
    this.parentElement.style.borderColor = 'rgb(42, 141, 0)';
  }
  this.addEventListener('mouseout',()=>{
    this.parentElement.style.borderLeft = def;
  })
}

function removeMouseOver(){
  let def = this.parentElement.style.borderLeft;
  this.parentElement.style.borderColor = "red"
  this.addEventListener('mouseout',()=>{
    this.parentElement.style.borderLeft = def;
  })
}

function editMouseOver(){
  let def = this.parentElement.style.borderLeft;
  this.parentElement.style.borderColor = "rgb(0, 125, 220)"
  this.addEventListener('mouseout',()=>{
    this.parentElement.style.borderLeft = def;
  })
}

function editElem(){
  let i = indByElem.apply(this);
  let book = library[i];
  bookNameIP.value = book.name;
  authorIP.value = book.author;
  pagesIP.value = book.value;
  isReadIP.checked = book.isRead;
  removeElem.apply(this)
  bookNameIP.focus()
}

function removeElem(){
  let i = indByElem.apply(this);
  console.log(i)
  library.splice(i, 1);
  this.parentElement.remove();
  updateView();
}

function indByElem(){
  let list = this.parentElement.classList.value;
  let index = list.split(' ')[2].split('=')[1];
  const i = index.replaceAll("'", '');
  return i;
}

function Book (name, author, pages, isRead){
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = Boolean(isRead);
}

Book.prototype.toggleRead = function(){
  this.isRead = (this.isRead)? false: true;
  updateView()
};

function addBook(){
  let _bookName = bookNameIP.value;
  let _author = authorIP.value;
  let _pages = pagesIP.value;
  let _isRead = (isReadIP.checked)?'read':'';
  library.push(new Book (_bookName, _author, _pages, _isRead));
  updateView();
  clearIP();
}

function clearIP(){
  bookNameIP.value = '';
  authorIP.value = '';
  pagesIP.value = '';
}

function updateView(){
  if (card) card.forEach((c)=>{c.remove()})
  count=0;
  library.forEach((book)=>{
    let _bookName = book.name;
    let _author = book.author;
    let _pages = book.pages;
    let _isRead = book.isRead;
    input.insertAdjacentHTML('afterend', 
            `<div class="card ${(_isRead)?'read':'unread'} index='${count}'">
              <div class="bookName">${_bookName?_bookName:'Title Undefined'}</div>
              <div class="author">by<br>${_author?_author:'Author Undefined'}</div>
              <div class="pages">Pages: ${_pages?_pages:'undefined'}</div>
              <button class="isRead">${(_isRead)?'Read':'Unread'}</button>
              <img src="img/delete.svg" alt="remove" class="remove"></img>
              <img src="img/edit.svg" alt="edit" class="edit"></img>
            </div>`)
    count++;
  })

  card = document.querySelectorAll('.card');
  remove = document.querySelectorAll('.remove');
  readButton = document.querySelectorAll('button.isRead')
  remove.forEach((r)=>{
    r.addEventListener('click', removeElem);
    r.addEventListener('mouseover', removeMouseOver);
  })
  edit = document.querySelectorAll('.edit');
  edit.forEach((e)=>{
    e.addEventListener('click', editElem);
    e.addEventListener('mouseover', editMouseOver);
  })
  readButton.forEach((e)=>{
    e.addEventListener('click', toggleRead)
    e.addEventListener('mouseover', readMouseOver)
  })
}