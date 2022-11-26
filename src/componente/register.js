import { singup } from '../lib/auth.js';

export const Register = () => {
  const registerDiv = document.createElement('section');
  registerDiv.classList.add('sectionRegister');

  registerDiv.innerHTML = `
  <article class = "plantilla">
   <div class= "images">
    <img class="logo" src="img/logo.png" alt="">
    <p class= "mensaje">Únete a nuestra comunidad y construye amistades que ven desde el corazón.</p>
   </div>
   
   <div>
    <form class= "formRegister">
    <input type = "text" id = "email" class= "form-register" placeholder = "Correo Electrónico"><br>
    <input type = "text" id= "name" class= "form-register" placeholder = "Nombre completo"><br>
    <input type = "text" id= "userName" class= "form-register" placeholder = "Nombre de usuario"><br>
    <div class = "userPassword">
    <span class = "icon-eyes">
    <i class="fa-solid fa-eye-slash" ></i>
    </span>
    <input type = "password" id= "password" class= "form-register" placeholder = "Contraseña">
    </div>
  </form>
  </div>
  <p class= "mensaje" > Al registrarte, aceptas nuestras Condiciones,<br> la Política de privacidad y la Política de cookies. </p>
  </article>`;
  const eyes1 = registerDiv.querySelector('.icon-eyes');
  eyes1.addEventListener('click', () => {
    const icon = registerDiv.querySelector('i');
    if (eyes1.nextElementSibling.type === 'password') {
      eyes1.nextElementSibling.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }else {
      eyes1.nextElementSibling.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrate';
  buttonRegister.classList.add('buttonRegister');
  registerDiv.appendChild(buttonRegister);

  const backHome = document.createElement('div');
  backHome.classList.add('enlaces1');

  const parrafo3 = document.createElement('p');
  parrafo3.classList.add('border');
  parrafo3.textContent = '¿Tienes una cuenta?';
  const linkBackHome = document.createElement('a');
  linkBackHome.setAttribute('href', '');
  linkBackHome.textContent = 'Iniciar Sesión';

  parrafo3.appendChild(linkBackHome);
  backHome.appendChild(parrafo3);
  registerDiv.appendChild(backHome);

  const singupElemnt = registerDiv.querySelector('.buttonRegister');
  singupElemnt.addEventListener('click', () => {
    const email = registerDiv.querySelector('#email').value;
    const password = registerDiv.querySelector('#password').value;
    const promise = singup(email, password);

    promise
      .then((userCredential) => {
        const user = userCredential.user;
        alert('Bienvenido a Down Family ahora puedes iniciar sesión');
        console.log(user);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode.includes('auth/email-already-in-use')) {
          alert('Tu email ya se encuentra registrado');
        }
        if (errorCode.includes('auth/internal-error')) {
          alert('Correo inválido')
        }
        if (errorCode.includes('auth/weak-password')) {
          alert('La contraseña debe tener al menos 6 caracteres')
        }
        console.log(errorCode, errorMessage);
      });
  });

  return registerDiv;
};
