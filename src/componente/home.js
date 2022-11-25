import { signIn, signInGoogle, resetPassword } from '../lib/auth.js';

export const Home = () => {
  const HomeDiv = document.createElement('section');
  HomeDiv.classList.add('sectionHome');
  HomeDiv.innerHTML = `
  <article class = "plantilla">
   <div class= "images">
    <img class="logo" src="img/logo.png" alt="">
    <img class="girl" src="img/una.png" alt="">
   </div>
   <div>
    <input type = "text" class= "user emailPassword" id="email" placeholder = "Usuario o Correo Electrónico">
    <input type = "text" class= "user" id="password"  placeholder = "Contraseña">
  </div>
  </article>
 `;
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'btn-login';
  buttonLogin.textContent = 'Iniciar sesión';
  HomeDiv.appendChild(buttonLogin);

  const google = document.createElement('div');
  google.classList.add('enlaces');
  const imgGoogle = document.createElement('img');
  imgGoogle.src = 'img/google.png';

  const linkGoogle = document.createElement('a');
  linkGoogle.setAttribute('href', '');
  linkGoogle.classList.add('linkGoogle');
  linkGoogle.textContent = 'Continuar con tu cuenta en Google';

  google.appendChild(imgGoogle);
  google.appendChild(linkGoogle);
  HomeDiv.appendChild(google);

  const linkPassword = document.createElement('a');
  linkPassword.classList.add('enlaces');
  linkPassword.classList.add('resetPassword');
  linkPassword.setAttribute('href', '');
  linkPassword.textContent = '¿Olvidaste tu contraseña?';
  HomeDiv.appendChild(linkPassword);

  const register = document.createElement('div');
  register.classList.add('enlaces');

  const parrafo2 = document.createElement('p');
  parrafo2.classList.add('border');
  parrafo2.textContent = '¿No tienes una cuenta?';

  const linkRegister = document.createElement('a');
  linkRegister.setAttribute('href', '#Register');
  linkRegister.textContent = 'Registrate';

  parrafo2.appendChild(linkRegister);
  register.appendChild(parrafo2);
  HomeDiv.appendChild(register);

  buttonLogin.addEventListener('click', () => {
    const email = HomeDiv.querySelector('#email').value;
    const password = HomeDiv.querySelector('#password').value;
    const signIn2 = signIn(email, password);

    signIn2
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          window.location.hash = '#Muro';
          console.log(user);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.includes('auth/user-not-found')) {
          alert('El correo electrónico que ingresaste no está conectado a una cuenta.');
        }
        if (errorCode.includes('auth/wrong-password')) {
          alert('La contraseña que ingresaste es inválida.');
        }
        if (errorCode.includes('auth/invalid-email')) {
          alert('Debes ingresar tu correo y contraseña para iniciar sesión');
        }
        if (errorCode.includes('auth/internal-error')) {
          alert('Debes ingresar tu contraseña para iniciar sesión');
        }
        console.log(errorCode, errorMessage);
      });
  });
  const signInWithGoogle = HomeDiv.querySelector('.linkGoogle');
  signInWithGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    const promiseGoogle = signInGoogle();
    promiseGoogle
      .then(() => {
        window.location.hash = '#Muro';
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        if (errorCode.includes('auth/popup-closed-by-user')) {
          alert('La ventana se cerró inesperadamente.');
        }
        if (errorCode.includes('auth/cancelled-popup-request')) {
          alert('La solicitud fue cancelada');
        }
      });
  });

  const reset = HomeDiv.querySelector('.resetPassword');
  reset.addEventListener('click', (e) => {
    e.preventDefault();
    const email = HomeDiv.querySelector('.emailPassword').value;
    const newPassword = resetPassword(email);
    newPassword
      .then(() => {
        alert('Te enviamos un correo de restablecimiento de contraseña, revisa tu correo electrónico!');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode.includes('auth/missing-email')) {
          alert('Introduce el correo electrónico con el que te registrarte.');
        }
        if (errorCode.includes('auth/invalid-email')) {
          alert('El correo electrónico es inválido, por favor ingresa un correo válido.');
        }
        if (errorCode.includes('auth/user-not-found')) {
          alert('El correo no está registrado, por favor registrate para iniciar sesión.');
        }
        console.log(errorCode);
      });

    console.log(email, newPassword);
  });

  return HomeDiv;
};
