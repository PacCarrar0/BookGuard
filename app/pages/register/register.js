import { user } from "../../model/user.js";
import { registerService } from "../../service/user.service.js";

let main = function(){
  
  document.addEventListener('DOMContentLoaded', function(){

  let usersRegistered = localStorage.getItem("records");
  let user = JSON.parse(usersRegistered);

  // Exibindo os dados na div com o ID 'result'
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p>Nome: ${user[0].name}</p><p>Senha: ${user[0].password}</p>`;

  });

  //botão limpar
  document.getElementById('clear-btn').addEventListener('click', function(){
    let field = document.querySelectorAll('#form-register input');
    field.forEach(field => { field.value = '';});
  });
  //botão limpar
}
main();

//validação do formulário
function validateNameField() {
  const nameInput = document.getElementById('name-input');
  const nameError = document.getElementById('name-error');
  if (nameInput.validity.valueMissing) {
    nameError.textContent = 'Obrigatório.';
    nameError.style.display = 'block';
    return false;
  }
  if (nameInput.validity.patternMismatch) {
    nameError.textContent = 'Insira um nome válido.';
    nameError.style.display = 'block';
    return false;
  }
  nameError.style.display = 'none';
  return true;
}

function validatePasswordField() {
  const nameInput = document.getElementById('password-input');
  const nameError = document.getElementById('password-error');
  if (nameInput.validity.valueMissing) {
    nameError.textContent = 'O campo é obrigatório.';
    nameError.style.display = 'block';
    return false;
  }
  if (nameInput.validity.patternMismatch) {
    nameError.textContent = 'A senha precisa conter no mínimo 4 caracteres e um número.';
    nameError.style.display = 'block';
    return false;
  }
  nameError.style.display = 'none';
  return true;
}

function passwordConfirmation(){
  const password = document.getElementById('password-input').value;
  const confirmPassword = document.getElementById('confirm-password-input').value;
  const nameError = document.getElementById('confirm-password-error');
  
  if(password != confirmPassword){
    nameError.textContent = 'As senhas precisam ser iguais.';
    nameError.style.display = 'block';
    return false;
  }

  nameError.style.display = 'none';
  return true;
}
//validação do formulário

//desativação do botão submit por padrão
function enableSubmitButtonOnFormChange() {
  const submitButton = document.getElementById('submit-button');
  submitButton.disabled = true;
}

enableSubmitButtonOnFormChange();
//desativação do botão submit por padrão

function onSubmit() {
  const userService = new registerService();
  const name = document.getElementById('name-input').value;
  const password = document.getElementById('password-input').value;

  let user1 = new user(name, password);
  userService.saveLocal(user1);


}

document.querySelector('#name-input').addEventListener('input', function () {
  validateNameField();
});

document.querySelector('#password-input').addEventListener('input', function () {
  validatePasswordField();
});

document.querySelector('#confirm-password-input').addEventListener('input', function () {
  passwordConfirmation();
});

//ativação e desativação do botão submit
document.querySelector('#form-register').addEventListener('input', function () {
  const submitButton = document.getElementById('submit-button');
  if(validateNameField() && validatePasswordField() && passwordConfirmation()){
    submitButton.disabled = false;
    submitButton.addEventListener('click', function () {
      onSubmit();
    });
  }else{
    submitButton.disabled = true;
  }
})