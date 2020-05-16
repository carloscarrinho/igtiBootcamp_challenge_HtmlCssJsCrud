window.addEventListener('load', start);

var globalNames = ['Carlos', 'Emili', 'Banana', 'Fátima'];
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start() {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');
  activateInput(inputName);
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault(); 
  }

  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput(input) {
  input.focus();
  function handleTyping(event) {
    let hasText = !!event.target.value.trim();

    if (event.key === 'Enter' && hasText) {
      if(isEditing === true) {
        globalNames[currentIndex] = event.target.value;
      } else {
        globalNames.push(event.target.value);
      }
      
      render();
      isEditing = false;
      clearInput(inputName);
    }
  }
  input.addEventListener('keyup', handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    let button = document.createElement('button');
    button.classList.add('button');
    button.textContent = 'Excluir';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editName() {
      isEditing = true;
      inputName.value = name;
      inputName.focus();
      currentIndex = index;
    }
    
    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editName);
    return span;
  }

  let divNames = document.querySelector('#names');
  let ul = document.createElement('ul');
  divNames.innerHTML = '';

  for(i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];
    let li = document.createElement('li');
    let deleteButton = createDeleteButton(i);
    let span = createSpan(currentName, i);
    li.appendChild(deleteButton);
    li.appendChild(span);
    ul.appendChild(li);
  }

  clearInput(inputName);
  return divNames.appendChild(ul);
}

function clearInput(input) {
  input.value = '';
  input.focus();
}