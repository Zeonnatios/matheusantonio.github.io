const buttonLogin = document.getElementById('buttonLogin');
const textArea = document.getElementById('textarea');
const counter = document.getElementById('counter');
const checkbox = document.getElementById('agreement');
const submit = document.getElementById('submit-btn');
const inputName = document.getElementById('input-name');
const inputLastName = document.getElementById('input-lastname');
const inputCurrentEmail = document.getElementById('input-email');
const house = document.getElementById('house');
const text = document.querySelector('textarea');
const form = document.getElementById('evaluation-form');

buttonLogin.addEventListener('click', () => {
  const inputEmail = document.getElementById('loginEmail').value;
  const inputPasswd = document.getElementById('loginPassword').value;

  if (inputEmail === 'tryber@teste.com' && inputPasswd === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
});
// 18

submit.disabled = true;

checkbox.addEventListener('click', () => {
  if (checkbox.checkbox === '') {
    submit.disabled = true;
  } else {
    submit.disabled = false;
  }
});

textArea.addEventListener('keyup', () => {
  counter.innerHTML = 500 - textArea.value.length;
});

submit.addEventListener('click', (event) => {
  event.preventDefault();
  const family = document.querySelector('input[name="family"]:checked').value;
  const rate = document.querySelector('input[name="rate"]:checked').value;
  const check = document.querySelectorAll('.subject:checked');
  const arrChecked = [];
  for (let index = 0; index < check.length; index += 1) {
    arrChecked.push(check[index].value);
  }

  form.innerHTML += `Nome: ${inputName.value} ${inputLastName.value}
  Email: ${inputCurrentEmail.value}
  Casa: ${house.value}
  Família: ${family}
  Matérias: ${arrChecked.join(', ')}
  Avaliação: ${rate}
  Observações: ${text.value}`;
});
