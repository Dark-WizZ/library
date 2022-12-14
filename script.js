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
let readButton = document.querySelectorAll('button.isRead');
const titleError = document.querySelector('.bookName .error')
const authorError = document.querySelector('.author .error')
const pagesError = document.querySelector('.pages .error')
const blueClr= 'rgb(0, 125, 220)';
const  mainClr= 'rgb(220, 220, 220)';
const headerClr= 'white';
const read= 'rgb(42, 141, 0)';
const unread= 'rgb(221, 202, 0)';


submitIP.addEventListener('click', addBook);
pagesIP.addEventListener('input', pageIPChange)

function pageIPChange(){
  if(!(/^[0-9]*$/.test(pagesIP.value))){
      pagesError.textContent='Please enter numbers.'
  }else{
      pagesError.textContent='';
  }
}

function toggleRead(){
  let i = indByElem.apply(this);
  library[i].toggleRead();
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
  pagesIP.value = book.pages;
  isReadIP.checked = book.isRead;
  removeElem.apply(this)
  bookNameIP.focus()
}

function removeElem(){
  let i = indByElem.apply(this);
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

class Book {
  constructor(name, author, pages, isRead){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = Boolean(isRead);
  }
}

Book.prototype.toggleRead = function(){
  this.isRead = (this.isRead)? false: true;
  updateView()
};

function addBook(){
  let error= false;
  let _bookName = bookNameIP.value;
  let _author = authorIP.value;
  let _pages = pagesIP.value;
  let _isRead = (isReadIP.checked)?'read':'';
  if(_bookName==''){
    titleError.textContent="Title can't be empty!"
    error=true;
  }else{
    titleError.textContent='';
  }
  if(_author==''){
    authorError.textContent="Please enter author's name."
    error=true;
  }else{
    authorError.textContent='';
  }
  if(!(/^[0-9]*$/.test(pagesIP.value))){
      pagesError.textContent='Please enter numbers.'
      error=true;
  }else{
      pagesError.textContent='';
  }
  if(error) return;
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
  })
}