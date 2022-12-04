import { createUserWithEmailAndPassword } from 'firebase/auth';
import { singup } from '../src/lib/autentication.js';

jest.mock('firebase/auth');

describe('singup', () => {
  it('debería ser una función', () => {
    expect(typeof singup).toBe('function');
  });

  it('Debe llamarse al método crear usuario', () => {
    createUserWithEmailAndPassword.mockImplementation(() => Promise.resolve('gaba@gmail.com'));
    singup(createUserWithEmailAndPassword);

    expect(createUserWithEmailAndPassword).toBeCalled();
  });

  it('deberia retornar un objeto con la propiedad email', () => {
    singup('gaba@gmail.com', '1234567').then((user) => {
      expect(user).toBe('gaba@gmail.com');
    });
  });
  it('Debe recibir parámetros', () => {
    singup('gaba@gmail.com', '1234567');
    expect('firebase/auth'.createUserWithEmailAndPassword).toHaveBeenCalledWith(3);
  });
});
