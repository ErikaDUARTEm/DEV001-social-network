import { signIn, signInGoogle, resetPassword, stateChanged } from '../lib/autentication.js';
import { showErrorMessage } from './Alert.js';

export const Home = () => {
  const HomeDiv = document.createElement('section');
  HomeDiv.classList.add('sectionHome');
  HomeDiv.innerHTML = `
  <div class='message'>
  <span class="error-message" id="error-message"></span>
  </div>
  <div class = "plantilla">
  <div class= "images">
    <img class="logo" src="img/logo.png" alt="logo">
    <img class="girl" src="img/una.png" alt="girl">
  </div>
  <div class = "inputHome">
    <form class = "formHome">
    <input type = "text" class= "user emailPassword" id="email" placeholder = "Usuario o Correo Electrónico">
    <div class = "userPassword">
    <span class = "icon-eyes">
    <i class="fa-solid fa-eye-slash" ></i>
    </span>
    <input type = "password" class= "user" id="password"  placeholder = "Contraseña">
    </div>
    </form>
  </div>

  </div>
`;
  const eyes = HomeDiv.querySelector('.icon-eyes');
  eyes.addEventListener('click', () => {
    const icon = HomeDiv.querySelector('i');
    if (eyes.nextElementSibling.type === 'password') {
      eyes.nextElementSibling.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      eyes.nextElementSibling.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });
  const buttonLogin = document.createElement('button');
  buttonLogin.id = 'btn-login';
  buttonLogin.textContent = 'Iniciar sesión';
  HomeDiv.appendChild(buttonLogin);

  const contenedorEnlace = document.createElement('div');
  contenedorEnlace.classList.add('enlacesContenedor');
  const google = document.createElement('div');
  google.classList.add('enlaces');
  const imgGoogle = document.createElement('img');
  imgGoogle.src = 'img/google.png';
  contenedorEnlace.appendChild(google);

  const linkGoogle = document.createElement('a');
  linkGoogle.setAttribute('href', '');
  linkGoogle.classList.add('linkGoogle');
  linkGoogle.textContent = 'Inicia con tu cuenta Google';

  google.appendChild(imgGoogle);
  google.appendChild(linkGoogle);
  // HomeDiv.appendChild(google);

  const linkPassword = document.createElement('a');
  linkPassword.classList.add('enlaces');
  linkPassword.classList.add('resetPassword');
  linkPassword.setAttribute('href', '');
  linkPassword.textContent = '¿Olvidaste tu contraseña?';
  // HomeDiv.appendChild(linkPassword);
  contenedorEnlace.appendChild(linkPassword);

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
  contenedorEnlace.appendChild(register);
  // HomeDiv.appendChild(register);
  HomeDiv.appendChild(contenedorEnlace);
  const idSpan = HomeDiv.querySelector('#error-message');

  buttonLogin.addEventListener('click', () => {
    const email = HomeDiv.querySelector('#email').value;
    const password = HomeDiv.querySelector('#password').value;
    const formHome = HomeDiv.querySelector('.formHome');
    signIn(email, password).then((userCredential) => {
      const user = userCredential.user;
      stateChanged(() => {
        if (user) {
          const uid = user.uid;
          console.log(uid);
          window.location.hash = '#Muro';
        } else {
          // User is signed out
          // ...
        }
      });
    })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode.includes('auth/user-not-found')) {
          showErrorMessage('El correo electrónico que ingresaste no está conectado a una cuenta.', idSpan);
        }
        if (errorCode.includes('auth/wrong-password')) {
          showErrorMessage('La contraseña que ingresaste es inválida.', idSpan);
        }
        if (errorCode.includes('auth/invalid-email')) {
          showErrorMessage('Debes ingresar tu correo y contraseña para iniciar sesión o verifica que el correo electrónico es válido.', idSpan);
        }
        if (errorCode.includes('auth/internal-error')) {
          showErrorMessage('Debes ingresar tu contraseña para iniciar sesión.', idSpan);
        }
        formHome.reset();
      });
  });
  const signInWithGoogle = HomeDiv.querySelector('.linkGoogle');
  signInWithGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle().then(() => {
      window.location.hash = '#Muro';
    })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode.includes('auth/popup-closed-by-user')) {
          showErrorMessage('La ventana se cerró inesperadamente.', idSpan);
        }
        if (errorCode.includes('auth/cancelled-popup-request')) {
          showErrorMessage('La solicitud fue cancelada', idSpan);
        }
      });
  });

  const reset = HomeDiv.querySelector('.resetPassword');
  reset.addEventListener('click', (e) => {
    e.preventDefault();
    const email = HomeDiv.querySelector('.emailPassword').value;
    resetPassword(email).then(() => {
      showErrorMessage('Te enviamos un correo de restablecimiento de contraseña, revisa tu correo electrónico!', idSpan);
    })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode.includes('auth/missing-email')) {
          showErrorMessage('Introduce el correo electrónico con el que te registrarte.', idSpan);
        }
        if (errorCode.includes('auth/invalid-email')) {
          showErrorMessage('El correo electrónico es inválido, por favor ingresa un correo válido.', idSpan);
        }
        if (errorCode.includes('auth/user-not-found')) {
          showErrorMessage('El correo no está registrado, por favor registrate para iniciar sesión.', idSpan);
        }
      });
  });
  return HomeDiv;
};
