let library = [];

const bookName = document.querySelector('.name');
const author = document.querySelector('.author');
const pages = document.querySelector('.pages');
const isRead = document.querySelector('.isRead');
const add = document.querySelector('.add');

add.addEventListener('click', addBook);

function Book (name, author, pages, isRead){
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = Boolean(isRead);
}

function addBook(){
  const _bookName = bookName.value;
  const _author = author.value;
  const _pages = pages.value;
  const _isRead = isRead.value;
  library.push(new Book (_bookName, _author, _pages, _isRead));
  console.table(library)
}