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
  const UserIndex = JSON.parse(localStorage.getItem('index'));
  const users = JSON.parse(localStorage.getItem('records'));
  let userData = users[UserIndex];
  let userCompositions = userData.tuples ||  [] ;

  const compositionName = document.getElementById('name-composition-input').value;
  const compositiongenre = document.getElementById('genre-composition-input').value;

  const novaTupla = {"name": compositionName, "genre": compositiongenre, "letter": ""};

  userCompositions.push(novaTupla);
  userData.tuples = userCompositions;
  users[UserIndex] = userData;

  localStorage.setItem('records', JSON.stringify(users));
}
//Cadastro dos dados da composição

//Exclusão do card da composição
function deleteCard(index) {
  const UserIndex = parseInt(localStorage.getItem('index')) || 0;
  let users = JSON.parse(localStorage.getItem('records'));
  let userData = users[UserIndex];
  let userCompositions = userData.tuples;

  userCompositions.splice(index, 1);
  
  userData.tuples = userCompositions;
  users[UserIndex] = userData;
  
  localStorage.setItem('records', JSON.stringify(users));

  window.location.reload();
}
//Exclusão do card da composição

//Recuperção dos dados do local storage e exibição
function displayCards() {
  const userIndex = parseInt(localStorage.getItem('index')) || 0;
  const app = document.getElementById('cards-container');
  app.innerHTML = '';

  let users = JSON.parse(localStorage.getItem('records'));
  let userData = users[userIndex];
  let userCompositions = userData.tuples;

  const rowElement = document.createElement('div');
  rowElement.classList.add('row', 'row-cols-lg-2', 'gx-3');
  app.appendChild(rowElement);

  userCompositions.forEach(function(composition, i) {
    const cardElement = document.createElement('div');
  
    cardElement.innerHTML = 
      `
      <a id="composition-data-link" href="/app/pages/composition/" class="text-decoration-none">
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h4 class="card-text">${userCompositions[i].name}</h4>
              <button type="button" id="card-close-button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <h5 class="card-text">${userCompositions[i].genre}</h5>
          </div>
        </div>
      </a>
      `;
  
    // Adiciona um ouvinte de evento ao botão, chamando a função deleteCard com o índice
    const deleteButton = cardElement.querySelector('.btn-close');
    deleteButton.addEventListener('click', function(event) {
      event.preventDefault();
      deleteCard(i);
    });

    const CompositionDataLink = cardElement.querySelector('.text-decoration-none');
    CompositionDataLink.addEventListener('click', function() {
      localStorage.setItem('compositionIndex', i)
    })
  
    rowElement.appendChild(cardElement);
  });
  
}
//Recuperção dos dados do local storage e exibição

document.addEventListener('DOMContentLoaded', function() {
  displayCards()
})

let modal = document.getElementById('composition-modal');

document.getElementById('composition-submit-button').addEventListener('click', function(event){
  event.preventDefault();
  onSubmit()
  modal.style.display = 'none'
  window.location.href = '/app/pages/home'
});

document.getElementById('composition-create-button').addEventListener('click', function() {
  modal.style.display = 'block'
})

document.getElementById('close-button').addEventListener('click', function (){
  modal.style.display = 'none'
  window.location.href = '/app/pages/home'
})