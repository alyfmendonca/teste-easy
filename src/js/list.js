import InputMask from './inputs.js';
import DbConnection from './bd.js';

const masks = new InputMask();
const db = new DbConnection();

function buildTable(data){
    let tableContent = '';
    
    data.map(tableLine => {
        tableContent += `
        <tr>
            <td>${tableLine.name}</td>
            <td>${tableLine.email}</td>
            <td>${tableLine.cpf}</td>
            <td>${tableLine.phone}</td>
            <td class="center"><button class="delete-icon"><img  src="../img/close.svg" /></button></td>
            <td class="center"><button class="edit-icon"><img  src="../img/pencil.svg" /></button></td>
        </tr>
        `
    });

    setTimeout(() => {
        addComentLineOnTable();
    }, 500);

    document.getElementById('happy-face').classList.add('hide')
    document.getElementById('sad-face').classList.add('hide')
    data.find(x => x.name == 'Alyf Mendonça') ? document.getElementById('happy-face').classList.remove('hide') : document.getElementById('sad-face').classList.remove('hide')
    document.getElementById('myTableBody').innerHTML = tableContent;     
    
} 

function addComentLineOnTable(){
    let commentLine = `
        <tr id="edit-form" class="hide">
            <td>
                <div class="float-input">
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder=" " 
                        required
                    >
                    <label>Nome completo (sem abreviações)</label>
                    <small class="float-input--error" id="name-error">
                        
                    </small>
                </div>
            </td>
            <td>
                <div class="float-input">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder=" "
                        required
                    >
                    <label>E-mail</label>
                    <small class="float-input--error" id="email-error">
                        
                    </small>
                </div>
            </td>
            <td>
                <div class="float-input">
                    <input 
                        type="text" 
                        name="cpf" 
                        id="cpf" 
                        placeholder=" "
                        minlength="14"
                        maxlength="14"
                        required
                        disabled
                    >
                    <label>Cpf</label>
                    <small class="float-input--error" id="cpf-error">
                        
                    </small>
                </div>
            </td>
            <td>
                <div class="float-input">
                    <input 
                        type="text" 
                        name="phone" 
                        id="phone" 
                        placeholder=" " 
                        minlength="13"
                        maxlength="15"
                        required
                    >
                    <label>Telefone</label>
                    <small class="float-input--error" id="phone-error">
                        
                    </small>
                </div>
            </td>
            <td></td>
            <td class="center"><button class="save-icon"><img src="../img/check.svg"/></button></td>
        </tr>
    `;
    

    document.getElementById('myTableBody').innerHTML += commentLine;     

    setListenerOnInput();

}



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
    let list = db.getLocalTable();
    let selectedItem = list[i];
    document.getElementById('name').value = selectedItem.name;
    document.getElementById('cpf').value = selectedItem.cpf;
    document.getElementById('phone').value = selectedItem.phone;
    document.getElementById('email').value = selectedItem.email;
    document.getElementById('edit-form').classList.remove('hide');
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

function saveButton(){
    document.querySelectorAll('.save-icon').forEach((singleButton, index) => {
        singleButton.addEventListener(
            'click', 
            () => {
                saveEmployeeEdit();
            }
        )
    });
}

function setListenerOnInput(){
    document.querySelectorAll('input').forEach(singleInput => {
        singleInput.addEventListener(
            'input', 
            () => {
                validField(singleInput);
                singleInput.value = masks.validInput(singleInput.name,singleInput.value)
            }
        )
    });
}

function validField(event){
    if(event.value == ''){
        event.classList.add('invalid')
        setErrorMessage(`${event.name}-error`, 'Campo obrigatório');
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

    }
}
function setErrorMessage(fieldId, text){
    document.getElementById(fieldId).innerHTML = text;
}

function saveEmployeeEdit(){

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
    
}


function onPageLoaded() {
    let data = db.getLocalTable();
    data ? buildTable(data) : buildTable(db.getList());

    setTimeout(() => {
        deleteButton();
        editButton();
        saveButton();
    }, 1000);
    
}


onPageLoaded();

