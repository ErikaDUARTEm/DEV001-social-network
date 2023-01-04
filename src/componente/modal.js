import {
  post,
  auth,
} from '../lib/firebase.js';

export const modalComment = (muroDiv) => {
  const addComment = muroDiv.querySelectorAll('.add');
  addComment.forEach((element) => {
    element.addEventListener('click', () => {
      const modalContainer = muroDiv.querySelector('.modal');
      modalContainer.style.display = 'flex';
      modalContainer.innerHTML = `
          <div class='content-modal'>
          <div class= 'cancel'>
          <span class="material-symbols-outlined"><img src='https://raw.githubusercontent.com/ErikaDUARTEm/DEV001-social-network/main/src/img/cancel.png' class='cerrar'></span>
          </div>
          <div class= 'user-content'>
          <span class= 'userActive'><img src='${auth.currentUser.photoURL}' 
          alt='cuenta' class='account'></span>
          <span class= 'userName'>${auth.currentUser.displayName}</span>
          </div>
          <form class='comment' id='comment'>
          <textarea required type='text' class='newPost' placeholder='Cuéntanos tu historia...'></textarea>
          <button type='button' class='publish'>Publicar</button>
          </form>
          </div>
          `;
      const publish = modalContainer.querySelector('.publish');
      publish.addEventListener('click', () => {
        const coment = muroDiv.querySelector('.newPost').value;
        if (coment === '' || coment === ' ') {
          // eslint-disable-next-line no-alert
          alert('Este campo es requerido');
        } else {
          const publication = {};
          publication.fecha = Number(new Date());
          publication.coment = coment;
          publication.likes = [];
          publication.uid = auth.currentUser.uid;
          publication.photo = auth.currentUser.photoURL;
          publication.name = auth.currentUser.displayName;
          post(publication).then();
          modalContainer.style.display = 'none';
        }
      });
      const cerrarModal = muroDiv.querySelector('.cerrar');
      cerrarModal.addEventListener('click', () => {
        modalContainer.style.display = 'none';
      });
    });
  });
  return modalComment;
};
