import InputMask from './inputs.js';
import DbConnection from './bd.js';

const masks = new InputMask();
const db = new DbConnection();
const sendBtn = document.getElementById('sendButton');
const myForm = document.querySelector('form');


function submitMyForm(e){
    e.preventDefault()


    sendBtn.innerHTML = '<div class="button-load"><div></div><div></div><div></div><div></div></div>'

    let employee = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    }

    db.pushItemOnTable(employee);

    setTimeout(() => {
        myForm.reset();
        sendBtn.innerHTML = 'Cadastrar';
        document.querySelector('.success-message').classList.remove('hide');
    }, 2000);
    
}

function validField(event){
    if(event.value == ''){
        event.classList.add('invalid')
        setErrorMessage(`${event.name}-error`, 'Campo obrigatório');
        checkForm();
    }else{
        switch(event.name){
            case 'name': 
                if(event.value.length < 3) {
                    event.classList.add('invalid')
                    setErrorMessage(`${event.name}-error`, 'Campo deve conter 3 caracteres ou mais');
                }else{
                    event.classList.remove('invalid')
                    setErrorMessage(`${event.name}-error`, '');
                }
                break;
            case 'phone':
                if(event.value.length < 13) {
                    event.classList.add('invalid')
                    setErrorMessage(`${event.name}-error`, 'Número de telefone inválido');
                }else{
                    event.classList.remove('invalid');
                    setErrorMessage(`${event.name}-error`, '');
                }
                break;
            case 'cpf':
                if(event.value.length < 14) {
                    event.classList.add('invalid')
                    setErrorMessage(`${event.name}-error`, 'CPF inválido');

                }else{
                    event.classList.remove('invalid');
                    setErrorMessage(`${event.name}-error`, '');
                }
                break;
            case 'email': 
                event.classList.remove('invalid');
                setErrorMessage(`${event.name}-error`, '');
                break;
            default: 
                event.classList.remove('invalid')
                break; 
        }

        checkForm();
    }
}

function setErrorMessage(fieldId, text){
    document.getElementById(fieldId).innerHTML = text;
}

function checkForm(){
    myForm.checkValidity() ? sendButton.removeAttribute('disabled') : sendButton.setAttribute('disabled', '');
}

document.querySelectorAll('input').forEach(singleInput => {
    singleInput.addEventListener(
        'input', 
        () => {
            validField(singleInput);
            singleInput.value = masks.validInput(singleInput.name,singleInput.value)
        }
    )
});

myForm.addEventListener('submit', submitMyForm);
