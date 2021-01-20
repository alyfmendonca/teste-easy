export default class InputMask {
    constructor(){}

    validInput(name, value){
        switch (name) {
            case 'name':
                return value.replace(/\d/g, '');
                break;
            case 'cpf': 
                return value
                    .replace(/\D/g, '')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d)/, '$1.$2')
                    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                    .replace(/(-\d{2})\d+?$/, '$1');
                break;
            case 'phone':
                return value
                    .replace(/\D/g, '')
                    .replace(/(\d)/, '($1')
                    .replace(/(\d{2})(\d)/, '$1) $2')
                    .replace(/(\d{4})(\d)/, '$1-$2')
                    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
                    .replace(/(-\d{4})\d+?$/, '$1')

                return value;
                break;
            default:
                return value;
                break;
        }
    }

}


