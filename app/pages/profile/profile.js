let index = localStorage.getItem("index");

//Exibição dos dados pré coletados do usuário
function pageLoad(){
  document.addEventListener('DOMContentLoaded', function(){
    let usersRegistered = localStorage.getItem("records");
    let users = JSON.parse(usersRegistered);
    let currentProfile = users[index];

    let userName = $('#user-name');
    userName.text(currentProfile.name);
    userName.fadeIn(1500);

    let password = document.getElementById('profile-password-input');
    password.value = currentProfile.password;

    if(currentProfile.email != undefined){
      let email = document.getElementById('email-input');
      email.value = currentProfile.email;
    }

    if(currentProfile.cep != undefined){
      let cep = document.getElementById('cep-input');
      cep.value = currentProfile.cep;
    }

    if(currentProfile.genre != undefined){
      let genre = document.getElementById('genre-select');
      genre.value = currentProfile.genre;
    }

    if (currentProfile.city != undefined && currentProfile.estate != undefined) {
      let place = $("#user-place");
  
      place.text(currentProfile.city + ', ' + currentProfile.estate).fadeIn(1500);
    }

  });
}
pageLoad()
//Exibição dos dados pré coletados do usuário

//Salvamento dos novos dados do usuário
function onSubmit() {
  let email = document.getElementById('email-input').value;
  let genre = document.getElementById('genre-select').value;
  let cep = document.getElementById('cep-input').value;

//API via cep e salvamento dos novos dados
  let cepApi = cep.replace(/\D/g, '');

  if (cepApi.length !== 8) {
    alert('Formato de CEP inválido');
    return;
  }

  $.getJSON(`https://viacep.com.br/ws/${cepApi}/json/`, function(data) {
    if (!data.erro) {

      let usersRegistered = localStorage.getItem("records");
      let users = JSON.parse(usersRegistered);
      let currentProfile = users[index];

      currentProfile.email = email;
      currentProfile.cep = cep;
      currentProfile.genre = genre;
      currentProfile.city = data.localidade;
      currentProfile.estate = data.uf;

      localStorage.setItem("records", JSON.stringify(users));
    } else {
      alert('CEP não encontrado');
    }
  });

//API via cep e salvamento dos novos dados
}

let submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function (event) {
  event.preventDefault()

  onSubmit();

  setTimeout(function () {
    window.location.reload();
  }, 1000)
});