export const getAuth = jest.fn();
export const createUserWithEmailAndPassword = jest.fn((
  auth,
  email,
  password,
) => Promise.resolve({ user: { email } }));

// import { singup } from '../src/lib/auth.js';

// jest.mock('firebase/auth');

// describe('singup()', () => {
//   it('Debe ejecutar el metodo createUserWithEmailAndPassword', () => {
//     const email = 'gabrielawongchuig@gmail.com';
//     const password = '1234567';

//     // expect(singup(email, password)).resolves.toBeUndefine();

//     singup(email, password);

//     expect('firebase/auth'.createUserWithEmailAndPassword).toBeCalled();
//   });
// });
