import {
  signOut2,
} from '../lib/autentication.js';
import { modalComment } from './modal.js';
import { Post } from './Post.js';

export const Muro = () => {
  const muroDiv = document.createElement('section');
  muroDiv.classList.add('sectionMuro');
  muroDiv.innerHTML = `
  <header class="encabezado">
  <nav>
    <img class="logoMuro" src="img/logo.png" alt="logo">
    <span class="hambur material-symbols-outlined"><img src="img/menu_open.png" alt="menu" class="hambur material-symbols-outlined"></span>
    <nav class='menu-navegacion'>
      <a class='cerrarSesion'><strong>Cerrar Sesión</strong></a>
    </nav>
    </nav>
  </header>
  <section class="muro">
  </section>
  <section class='modal'></section>
  <footer>
  <nav class="footer">
    <span class="material-symbols-outlined"><img src="img/home.png" alt="home" class="home"></span>
    <span class="material-symbols-outlined"><img src="img/add_box.png" alt="agregar" class="add"></span>
    <span class="material-symbols-outlined"><img src="img/account_circle.png"  alt="cuenta" class="account"></span>
    </nav>
  </footer>
  `;
 
  const home = muroDiv.querySelector('.home');
  home.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });
  const hambur = muroDiv.querySelector('.hambur');
  const menuNavegacion = muroDiv.querySelector('.menu-navegacion');
  hambur.addEventListener('click', () => {
    menuNavegacion.classList.toggle('spread');
  });
  const out = muroDiv.querySelector('.cerrarSesion');
  out.addEventListener('click', () => {
    signOut2().then(() => {
      window.location.hash = '#';
      window.location.reload();
    });
  });
  modalComment(muroDiv);
  Post(muroDiv);
  return muroDiv;
};