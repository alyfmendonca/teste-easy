import DbConnection from '../src/js/bd';
const db = new DbConnection();

const mock = [{
    name: 'Inicio do teste',
    email: 'test@test.com',
    phone: '11123456789',
    cpf: '12312312341'
}];

db.setTableOnLocalStorage(mock);

describe('Banco de dados', () => {
    beforeEach(() => {
        db.setTableOnLocalStorage(mock);
    });

    afterEach(() => {
        db.deleteAll();
    });

    it('Retornando todos valores gravados nos LocalStorage', () => {
        expect(db.getLocalTable()).toEqual(mock);
    });

    it('Adicionando novo cadastro na base com pushItemOnTable()', () => {
        const newItem = {
            name: 'Teste add new',
            email: 'new@email.com',
            phone: '11123456781',
            cpf: '12346512315'
        };
        db.pushItemOnTable(newItem)

        let newMock = mock;
        newMock.push(newItem)

        expect(db.getLocalTable()).toEqual(newMock);
    });

    it('Apagando um item da tabela', () => {
        let result = db.getLocalTable();
        result.splice(0,1);
        expect(db.delete(0)).toEqual(result);
    });

    it('Apagando todos os dados da tabela', () => {
        db.deleteAll();
        expect(db.getLocalTable()).toEqual(null);
    });

    
});