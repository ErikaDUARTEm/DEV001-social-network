import {
  signOut2, auth,
} from '../lib/firebase.js';
import { modalComment } from './modal.js';
import { Post } from './Post.js';

export const Muro = () => {
  const muroDiv = document.createElement('section');
  muroDiv.classList.add('sectionMuro');
  muroDiv.innerHTML = `
  <header class="encabezado">
  <nav>
    <img class="logoMuro" src="https://raw.githubusercontent.com/ErikaDUARTEm/DEV001-social-network/main/src/img/logo.png" alt="logo">
    <span class="hambur material-symbols-outlined"><img src="https://raw.githubusercontent.com/ErikaDUARTEm/DEV001-social-network/main/src/img/menu_open.png" alt="menu" class="hambur material-symbols-outlined"></span>
    <nav class='menu-navegacion'>
      <a class='cerrarSesion'><strong>Cerrar Sesión</strong></a>
    </nav>
    <span class='desktop'>
      <a class='desktop'><img src="https://raw.githubusercontent.com/ErikaDUARTEm/DEV001-social-network/main/src/img/home.png" alt="home" class="home"></a>
      <a class='cerrarSesion'><strong>Cerrar Sesión</strong></a>
    </span>
    </nav>
  </header>
  <section class="editarPost"> 
    <span class="material-symbols-outlined"><img src="${auth.currentUser.photoURL}"  alt="cuenta" class="account"></span>
    <div class="add publicarPost">¿Qué estás pensando?</div>
  </section>
  <section class="muro">
  </section>
  <section class='modal'></section>
  <footer>
  <nav class="footer">
    <span class="material-symbols-outlined"><img src="https://raw.githubusercontent.com/ErikaDUARTEm/DEV001-social-network/main/src/img/home.png" alt="home" class="home"></span>
    <span class="material-symbols-outlined"><img src="https://raw.githubusercontent.com/ErikaDUARTEm/DEV001-social-network/main/src/img/add_box.png" alt="agregar" class="add"></span>
    <span class="material-symbols-outlined"><img src="${auth.currentUser.photoURL}"  alt="cuenta" class="account"></span>
    </nav>
  </footer>
  `;
  const home = muroDiv.querySelectorAll('.home');
  home.forEach((element) => {
    element.addEventListener('click', () => {
      window.scrollTo(0, 0);
    });
  });
  const hambur = muroDiv.querySelector('.hambur');
  const menuNavegacion = muroDiv.querySelector('.menu-navegacion');
  hambur.addEventListener('click', () => {
    menuNavegacion.classList.toggle('spread');
  });
  const out = muroDiv.querySelectorAll('.cerrarSesion');
  out.forEach((element) => {
    element.addEventListener('click', () => {
      signOut2().then(() => {
        window.location.hash = '#';
        window.location.reload();
      });
    });
  });

  modalComment(muroDiv);
  Post(muroDiv);
  return muroDiv;
};
