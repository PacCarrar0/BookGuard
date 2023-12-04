// Identificação da origem da página
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var fromSidenav = getParameterByName('fromSidenav');

if (fromSidenav === 'true') {
  let modal = document.getElementById('composition-modal');
  modal.style.display = 'block';
}
// Identificação da origem da página

//Cadastro dos dados da composição
function onSubmit(){
  const compositionName = document.getElementById('name-composition-input').value;
  const compositiongenre = document.getElementById('genre-composition-input').value;

  const userIndex = parseInt(localStorage.getItem('index')) || 0;

  const compositionsData = JSON.parse(localStorage.getItem('compositions')) || {};

  const userData = compositionsData[userIndex] || { tuples: [] };

  if (!userData.tuples) {
      userData.tuples = [];
  }

  const novaTupla = {"name": compositionName, "genre": compositiongenre, "letter": ""};  // Substitua com os campos e valores reais
  userData.tuples.push(novaTupla);

  compositionsData[userIndex] = userData;
  localStorage.setItem('compositions', JSON.stringify(compositionsData));
}
//Cadastro dos dados da composição

//Exclusão do card da composição
function deleteCard(index) {
  const userIndex = parseInt(localStorage.getItem('index')) || 0;
  let compositionData = JSON.parse(localStorage.getItem('compositions'));
  let userCompositions = compositionData[userIndex];
  let userCompositionsData = userCompositions.tuples;

  userCompositionsData.splice(index, 1);

  compositionData[userIndex] = userCompositions;
  localStorage.setItem('compositions', JSON.stringify(compositionData));

  window.location.reload();
}
//Exclusão do card da composição

//Recuperção dos dados do local storage e exibição
function displayCards() {
  const userIndex = parseInt(localStorage.getItem('index')) || 0;
  const app = document.getElementById('cards-container');
  app.innerHTML = '';

  let compositionData = JSON.parse(localStorage.getItem('compositions'));
  let userCompositions = compositionData[userIndex];
  let userCompositionsData = userCompositions.tuples;

  const rowElement = document.createElement('div');
  rowElement.classList.add('row', 'row-cols-lg-2', 'gx-3');
  app.appendChild(rowElement);

  userCompositionsData.forEach(function(composition, i) {
    const cardElement = document.createElement('div');
  
    cardElement.innerHTML = 
      `
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h4 class="card-text">${userCompositionsData[i].name}</h4>
            <button type="button" id="card-close-button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <h5 class="card-text">${userCompositionsData[i].genre}</h5>
        </div>
      </div>
      `;
  
    // Adiciona um ouvinte de evento ao botão, chamando a função deleteCard com o índice
    const deleteButton = cardElement.querySelector('.btn-close');
    deleteButton.addEventListener('click', function() {
      deleteCard(i);
    });
  
    rowElement.appendChild(cardElement);
  });
  
}
//Recuperção dos dados do local storage e exibição

document.addEventListener('DOMContentLoaded', function() {
  displayCards()
})

document.getElementById('composition-submit-button').addEventListener('click', function(event){
  event.preventDefault();
  onSubmit()
  let modal = document.getElementById('composition-modal');
  modal.style.display = 'none'
  window.location.href = '/app/pages/home'
});

document.getElementById('close-button').addEventListener('click', function (){
  let modal = document.getElementById('composition-modal');
  modal.style.display = 'none'
  window.location.href = '/app/pages/home'
})