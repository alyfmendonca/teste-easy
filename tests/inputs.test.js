import InputMask from '../src/js/inputs';
const masks = new InputMask();


describe('Mascáras dos Inputs', () => {
  describe('CPF', () => {
    it('Tentando inserir caracteres diferentes de números', () => {
      expect(masks.validInput('cpf', 'qwertyiioasdffhcbcvb!@#$%¨&*())_+=-{[]~,<.>;:')).toBe('');
    });

    it('Inserindo caracteres válidos e retornando formatação', () => {
      expect(masks.validInput('cpf', '0')).toBe('0');
      expect(masks.validInput('cpf', '01')).toBe('01');
      expect(masks.validInput('cpf', '012')).toBe('012');
      expect(masks.validInput('cpf', '0123')).toBe('012.3');
      expect(masks.validInput('cpf', '01234')).toBe('012.34');
      expect(masks.validInput('cpf', '0123456')).toBe('012.345.6');
      expect(masks.validInput('cpf', '01234567')).toBe('012.345.67');
      expect(masks.validInput('cpf', '012345678')).toBe('012.345.678');
      expect(masks.validInput('cpf', '0123456789')).toBe('012.345.678-9');
      expect(masks.validInput('cpf', '01234567890')).toBe('012.345.678-90');
    });
  });

  describe('Phone', () => {
    it('Tentando inserir caracteres diferentes de números', () => {
      expect(masks.validInput('phone', 'qwertyiioasdffhcbcvb!@#$%¨&*())_+=-{[]~,<.>;:')).toBe('');
    });

    it('Inserindo caracteres válidos e retornando formatação', () => {
      expect(masks.validInput('phone', '0')).toBe('(0');
      expect(masks.validInput('phone', '01')).toBe('(01');
      expect(masks.validInput('phone', '012')).toBe('(01) 2');
      expect(masks.validInput('phone', '0123')).toBe('(01) 23');
      expect(masks.validInput('phone', '01234')).toBe('(01) 234');
      expect(masks.validInput('phone', '012345')).toBe('(01) 2345');
      expect(masks.validInput('phone', '0123456')).toBe('(01) 2345-6');
      expect(masks.validInput('phone', '01234567')).toBe('(01) 2345-67');
      expect(masks.validInput('phone', '012345678')).toBe('(01) 2345-678');
      expect(masks.validInput('phone', '0123456789')).toBe('(01) 2345-6789');
      expect(masks.validInput('phone', '01234567890')).toBe('(01) 23456-7890');
    });
  });

  describe('Name', () => {
    it('Tentando inserir números', () => {
      expect(masks.validInput('name', '0123456789')).toBe('');
    });
  });
});