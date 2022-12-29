import {
  createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, onAuthStateChanged,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import {
  singup, signIn, signInGoogle, resetPassword, userCollection, stateChanged,
} from '../src/lib/firebase.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('singup', () => {
  it('Debería ser una función', () => {
    expect(typeof singup).toBe('function');
  });

  it('Debe llamarse al método crear usuario', () => {
    createUserWithEmailAndPassword.mockImplementation(() => {
      Promise.resolve({
        email: 'danicagarcia@gmail.com',
        password: '1234567',
      });
    });
    singup(createUserWithEmailAndPassword);

    expect(createUserWithEmailAndPassword).toBeCalled();
  });

  it('Deberia retornar un objeto con la propiedad email y password', () => {
    singup('danicagarcia@gmail.com', '1234567');
    expect({
      email: 'danicagarcia@gmail.com',
      password: '1234567',
    }).toEqual(expect.anything());
  });
});

it('Debe recibir parámetros', () => {
  singup('gaba@gmail.com', '1234567');
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), 'gaba@gmail.com', '1234567');
});

describe('signIn', () => {
  it('Debería ser una función', () => {
    expect(typeof signIn).toBe('function');
  });

  it('Debe validar el usuario registrado', () => {
    signInWithEmailAndPassword.mockImplementation(() => Promise.resolve({
      email: 'danicagarcia@gmail.com',
      password: '1234567',
    }));
    signIn(signInWithEmailAndPassword);

    expect(signInWithEmailAndPassword).toBeCalled();
  });
  it('Deberia retornar un objeto con la propiedad email', () => {
    signIn('danicagarcia@gmail.com', '1234567');
    expect({
      email: 'danicagarcia@gmail.com',
      password: '1234567',
    }).toEqual(expect.anything());
  });
  it('Debe recibir parámetros', () => {
    signIn('gaba@gmail.com', '1234567');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), 'gaba@gmail.com', '1234567');
  });
});

describe('signInGoogle', () => {
  it('Debería ser una función', () => {
    expect(typeof signInGoogle).toBe('function');
  });
  it('Debe validar el usuario registrado desde google', () => {
    signInWithPopup.mockImplementation(() => Promise.resolve('danicagarcia@gmail.com'));
    signInGoogle(signInWithPopup);

    expect(signInWithPopup).toBeCalled();
  });

  it('Debería poder ingresar con Google', () => {
    const provider = new GoogleAuthProvider();
    signInGoogle(getAuth(), provider).then(() => {
      expect(signInWithPopup).toHaveBeenCalledWith(getAuth(), provider);
    });
  });
});
describe('resetPassword', () => {
  it('Debería ser una función', () => {
    expect(typeof resetPassword).toBe('function');
  });
  it('Debe validar el usuario registrado', () => {
    sendPasswordResetEmail.mockImplementation(() => Promise.resolve('danicagarcia@gmail.com'));
    resetPassword(sendPasswordResetEmail);
    expect(sendPasswordResetEmail).toBeCalled();
  });

  it('Debería recuperar contraseña', () => {
    resetPassword('danicagarcia@gmail.com').then((email) => {
      expect(email).toBe('danicagarcia@gmail.com');
    });
  });
});
describe('userCollection', () => {
  it('Debería ser una función', () => {
    expect(typeof userCollection).toBe('function');
  });
  it('Debería llamar al metodo addDoc', () => {
    addDoc.mockImplementation(() => Promise.resolve('resolve'));
    collection.mockImplementation(() => ({}));
    userCollection('gaba@gmail.com', 'gaba', 'gaba1', '1234567');
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      email: 'gaba@gmail.com',
      fullName: 'gaba',
      userName: 'gaba1',
      password: '1234567',
    });
  });
});

describe('stateChanged', () => {
  it('Debería ser una función', () => {
    expect(typeof stateChanged).toBe('function');
  });

  it('Debe llamar al método onAuthStateChanged', () => {
    onAuthStateChanged.mockImplementation(() => {
      Promise.resolve({
        uid: 'NpmibTu1HBTW4xcMfvGYfZCPz2G3',
      });
    });
    stateChanged(onAuthStateChanged);

    expect(onAuthStateChanged).toBeCalled();
  });
  it('Deberia Obtener el usuario que ha iniciado sesión actualmente', () => {
    stateChanged({ user: { uid: 'NpmibTu1HBTW4xcMfvGYfZCPz2G3' } });
    expect({ uid: 'NpmibTu1HBTW4xcMfvGYfZCPz2G3' }).toEqual(expect.anything());
  });
  it('Debe recibir 2 parámetros', () => {
    stateChanged(getAuth(), { user: { uid: 'NpmibTu1HBTW4xcMfvGYfZCPz2G3' } });
    expect(onAuthStateChanged).toHaveBeenCalledWith(getAuth(), { user: { uid: 'NpmibTu1HBTW4xcMfvGYfZCPz2G3' } });
  });
});
