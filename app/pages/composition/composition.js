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

$('#image-modal-trigger1').on('click', function(event) {
  modal.style.display = 'block';

  modalTitle.style.display = 'block'
  modalTitle.textContent = `Tablatura de ${composition.name}`
});

$('#image-modal-trigger2').on('click', function(event) {
  modal.style.display = 'block';

  modalTitle.style.display = 'block'
  modalTitle.textContent = `Partitura de ${composition.name}`
});

$('#image-modal-close-button').on('click', function() {
  modal.style.display = 'none'
});
//Gerenciamento do modal de imagem

//Gerenciamento do upload de imagem
$('#upload-button1').on('click', function(event) {
  let fileInput = document.getElementById('tablature-file');
    
  event.stopPropagation();
  fileInput.click();
});

$('#upload-button2').on('click', function(event) {
  let fileInput = document.getElementById('sheet-music-file');
  event.stopPropagation();
  fileInput.click();
});
//Gerenciamento do upload de imagem

/* Parte do cloudinary

const unsignedUploadPreset = 'doc_codepen_example';

function uploadFile(file) {
  const url = `https://api.cloudinary.com/v1_1/djq3azkyr/upload`;
  const fd = new FormData();
  fd.append('file', file);

  fetch(url, {
    method: 'POST',
    body: fd,
  })
    .then((response) => response.json())
    .then((data) => {
      // File uploaded successfully
      const url = data.secure_url;
      // Create a thumbnail of the uploaded image, with 150px width
      const tokens = url.split('/');
      tokens.splice(-3, 0, 'w_150,c_scale');
      const img = new Image();
      img.src = tokens.join('/');
      document.getElementById('image-modal').appendChild(img);
    })
    .catch((error) => {
      console.error('Error uploading the file:', error);
    });
}

let fileInput = document.getElementById('sheet-music-file');

fileInput.addEventListener('change', function() {
  let file = fileInput.files[0];
  uploadFile(file);
})*/