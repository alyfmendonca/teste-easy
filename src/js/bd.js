const apiURL = 'https://private-21e8de-rafaellucio.apiary-mock.com/users';

export default class DbConnection {
    constructor(){}

    getList(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", apiURL, false);
        xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
        this.setTableOnLocalStorage(JSON.parse(xhttp.responseText))
        return JSON.parse(xhttp.responseText);     
    }
    setTableOnLocalStorage(data){
        localStorage.setItem('data', JSON.stringify(data))
    }   
    getLocalTable(){
        return JSON.parse(localStorage.getItem('data'));
    }

    pushItemOnTable(newEmployee){
        const list = this.getLocalTable() || [];
        list.push(newEmployee)
        this.setTableOnLocalStorage(list)
    }
    delete(index){
        const list = this.getLocalTable() || [];
        list.splice(index, 1);
        this.setTableOnLocalStorage(list)
        return list;
    }
    deleteAll(){
        localStorage.clear();
    }

}


