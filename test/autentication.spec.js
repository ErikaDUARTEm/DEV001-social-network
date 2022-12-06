import {
  createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail,
} from 'firebase/auth';
import {
  singup, signIn, signInGoogle, resetPassword,
} from '../src/lib/autentication.js';

jest.mock('firebase/auth');

describe('singup', () => {
  it('debería ser una función', () => {
    expect(typeof singup).toBe('function');
  });

  it('Debe llamarse al método crear usuario', () => {
    createUserWithEmailAndPassword.mockImplementation(() => Promise.resolve('danicagarcia@gmail.com'));
    singup(createUserWithEmailAndPassword);

    expect(createUserWithEmailAndPassword).toBeCalled();
  });

  it('deberia retornar un objeto con la propiedad email', () => {
    singup('danicagarcia@gmail.com', '1234567').then((user) => {
      expect(user).toBe('danicagarcia@gmail.com');
    });
  });
  it('Debe recibir parámetros', () => {
    singup('gaba@gmail.com', '1234567');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), 'gaba@gmail.com', '1234567');
  });
});

describe('signIn', () => {
  it('debería ser una función', () => {
    expect(typeof signIn).toBe('function');
  });

  it('Debe validar el usuario registrado', () => {
    signInWithEmailAndPassword.mockImplementation(() => Promise.resolve('danicagarcia@gmail.com'));
    signIn(signInWithEmailAndPassword);

    expect(signInWithEmailAndPassword).toBeCalled();
  });
  it('deberia retornar un objeto con la propiedad email', () => {
    signIn('danicagarcia@gmail.com', '1234567').then((user) => {
      expect(user).toBe('danicagarcia@gmail.com');
    });
  });
  it('Debe recibir parámetros', () => {
    signIn('gaba@gmail.com', '1234567');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), 'gaba@gmail.com', '1234567');
  });
});
describe('signInGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof signInGoogle).toBe('function');
  });
  it('Debe validar el usuario registrado desde google', () => {
    signInWithPopup.mockImplementation(() => Promise.resolve('danicagarcia@gmail.com'));
    signInGoogle(signInWithPopup);

    expect(signInWithPopup).toBeCalled();
  });

  it('debería poder ingresar con Google', () => {
    const provider = new GoogleAuthProvider();
    signInGoogle(getAuth(), provider)
      .then(() => {
        expect(signInWithPopup).toHaveBeenCalledWith(getAuth(), provider);
      });
  });
});
describe('resetPassword', () => {
  it('debería ser una función', () => {
    expect(typeof resetPassword).toBe('function');
  });
  it('Debe validar el usuario registrado', () => {
    sendPasswordResetEmail.mockImplementation(() => Promise.resolve('danicagarcia@gmail.com'));
    resetPassword(sendPasswordResetEmail);
    expect(sendPasswordResetEmail).toBeCalled();
  });

  it('debería recuperar contraseña', () => {
    resetPassword('danicagarcia@gmail.com').then((user) => {
      expect(user).toBe('danicagarcia@gmail.com');
    });
  });
});
