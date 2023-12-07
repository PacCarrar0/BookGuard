const Index = JSON.parse(localStorage.getItem('compositionIndex'));
const UserIndex = JSON.parse(localStorage.getItem('index'));
const users = JSON.parse(localStorage.getItem('records'));
let userData = users[UserIndex];
let userCompositions = userData.tuples
let composition = userCompositions[Index];


function onSubmit(){
  let letter = document.getElementById('letter-content').value;

  userData.tuples[Index].letter = letter;
  users[UserIndex] = userData

  localStorage.setItem('records', JSON.stringify(users));
}

document.addEventListener('DOMContentLoaded', function() {
  let compositionName = document.getElementById('composition-name');
  compositionName.textContent = composition.name; 
  let letter = document.getElementById('letter-content');
  letter.textContent = composition.letter;
});

//Gerenciamento do modal de letra
document.getElementById('letter-modal-trigger').addEventListener('click', function() {
  let modal = document.getElementById('letter-modal');
  modal.style.display = 'block';
});

document.getElementById('close-button').addEventListener('click', function (){
  let modal = document.getElementById('letter-modal');
  modal.style.display = 'none'
});

document.getElementById('letter-submit-button').addEventListener('click', function() {
  let modal = document.getElementById('letter-modal');
  modal.style.display = 'none'
  onSubmit();
});
//Gerenciamento do modal de letra

//Gerenciamento do modal de imagem
let modal = document.getElementById('image-modal'),
    modalTitle = modal.querySelector('.modal-title');
document.getElementById('image-modal-trigger1').addEventListener('click', function(event) {
  modal.style.display = 'block';

  modalTitle.style.display = 'block'
  modalTitle.textContent = `Tablatura de ${composition.name}`
});

document.getElementById('image-modal-trigger2').addEventListener('click', function(event) {
  modal.style.display = 'block';

  modalTitle.style.display = 'block'
  modalTitle.textContent = `Partitura de ${composition.name}`
});

document.getElementById('image-modal-close-button').addEventListener('click', function() {
  modal.style.display = 'none'
});
//Gerenciamento do modal de imagem

//Gerenciamento do upload de imagem
document.getElementById('upload-button1').addEventListener('click', function(event) {
  let fileInput = document.getElementById('tablature-file');
    
  event.stopPropagation();
  fileInput.click();
});

document.getElementById('upload-button2').addEventListener('click', function(event) {
  let fileInput = document.getElementById('sheet-music-file');
  event.stopPropagation();
  fileInput.click();
});
//Gerenciamento do upload de imagem
