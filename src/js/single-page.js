import InputMask from './inputs.js';
import DbConnection from './bd.js';

const masks = new InputMask();
const db = new DbConnection();
const sendBtn = document.getElementById('sendButton');
const myForm = document.querySelector('form');

var isFirstSave = false;

function submitMyForm(e){
    e.preventDefault()
    if(isFirstSave){
        saveEmployeeEdit();
        isFirstSave = false;
        document.getElementById('cpf').removeAttribute('disabled'); 
        return
    }

    sendBtn.innerHTML = '<div class="button-load"><div></div><div></div><div></div><div></div></div>'

    let employee = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    }

    db.pushItemOnTable(employee);

    onPageLoaded();

    setTimeout(() => {
        myForm.reset();
        sendBtn.innerHTML = 'Cadastrar';
    }, 2000);


    
}

function buildTable(data){
    let tableContent = '';
    
    data.map(tableLine => {
        tableContent += `
        <tr>
            <td>${tableLine.name}</td>
            <td>${tableLine.email}</td>
            <td>${tableLine.cpf}</td>
            <td>${tableLine.phone}</td>
            <td class="center"><button class="delete-icon"><img  src="../img/close.svg"/></button></td>
            <td class="center"><button class="edit-icon"><img  src="../img/pencil.svg" /></td>
        </tr>
        `
    });

    document.getElementById('happy-face').classList.add('hide')
    document.getElementById('sad-face').classList.add('hide')
    data.find(x => x.name == 'Alyf Mendonça') ? document.getElementById('happy-face').classList.remove('hide') : document.getElementById('sad-face').classList.remove('hide')
    document.getElementById('myTableBody').innerHTML = tableContent;     
    
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

function onPageLoaded() {
    let data = db.getLocalTable();
    data ? buildTable(data) : buildTable(db.getList()); 

    setTimeout(() => {
        deleteButton();
        editButton();
    }, 300);
}

onPageLoaded();


document.querySelectorAll('input').forEach(singleInput => {
    singleInput.addEventListener(
        'input', 
        () => {
            validField(singleInput);
            singleInput.value = masks.validInput(singleInput.name,singleInput.value)
        }
    )
});

function deleteEmploee(i){
    let newList = db.delete(i)
    onPageLoaded();
}

function deleteButton(){
    document.querySelectorAll('.delete-icon').forEach((singleButton, index) => {
        singleButton.addEventListener(
            'click', 
            () => {
                deleteEmploee(index);
            }
        )
    });
}

function callEditEmploee(i){
    isFirstSave = true;
    let list = db.getLocalTable();
    let selectedItem = list[i];
    document.getElementById('name').value = selectedItem.name;
    let cpfInput = document.getElementById('cpf');
    cpfInput.value = selectedItem.cpf;
    cpfInput.setAttribute('disabled', '')
    document.getElementById('phone').value = selectedItem.phone;
    document.getElementById('email').value = selectedItem.email;
}

function editButton(){
    document.querySelectorAll('.edit-icon').forEach((singleButton, index) => {
        singleButton.addEventListener(
            'click', 
            () => {
                callEditEmploee(index);
            }
        )
    });
}



function saveEmployeeEdit(){
    sendBtn.innerHTML = '<div class="button-load"><div></div><div></div><div></div><div></div></div>'

    let list = db.getLocalTable();

    let selectedItem = list.find(x => x.cpf == document.getElementById('cpf').value)
    let editedEmployee = {
        name: document.getElementById('name').value,
        cpf:  document.getElementById('cpf').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    }
    list[list.indexOf(selectedItem)] = editedEmployee;

    db.setTableOnLocalStorage(list);
    onPageLoaded();

    setTimeout(() => {
        myForm.reset();
        sendBtn.innerHTML = 'Cadastrar'
    }, 2000);
}

myForm.addEventListener('submit', submitMyForm);
