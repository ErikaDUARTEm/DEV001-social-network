import { createUserWithEmailAndPassword } from 'firebase/auth';
import { singup } from '../src/lib/autentication.js';

jest.mock('firebase/auth');

describe('singup', () => {
  it('debería ser una función', () => {
    expect(typeof singup).toBe('function');
  });
  it('deberia retornar un objeto con la propiedad email', () => singup('gaba@gmail.com', '1234567').then((user) => {
    expect(user.email).toBe('gaba@gmail.com');
  }));
});
