import { post, currentUserData } from '../lib/autentication.js';

export const modalComment = (muroDiv) => {
  const addComment = muroDiv.querySelector('.add');
  addComment.addEventListener('click', () => {
    const modalContainer = muroDiv.querySelector('.modal');
    modalContainer.style.display = 'flex';
    modalContainer.innerHTML = `
        <div class='content-modal'>
        <div class= 'cancel'>
        <span class="material-symbols-outlined"><img src='img/cancel.png' class='cerrar'></span>
        </div>
        <div class= 'user-content'>
        <span class= 'userActive'><img src='${currentUserData().photoURL}' 
        alt='cuenta' class='account'></span>
        <span class= 'userName'>${currentUserData().displayName}</span>
        </div>
        <form class='comment' id='comment'>
        <textarea required type='text' class='newPost' id='newPost' placeholder='Escribe un comentario...'>
        </textarea>
        <button type='button' class='publish'>Publicar</button>
        </form>
        </div>
        `;
    const publish = modalContainer.querySelector('.publish');
    publish.addEventListener('click', () => {
      const coment = muroDiv.querySelector('.newPost').value;
      if (coment === '' || coment === '  ') {
        alert('Este campo es requerido');
      } else {
        const publication = {};
        publication.fecha = Number(new Date());
        publication.coment = coment;
        publication.likes = [];
        publication.uid = currentUserData().uid;
        publication.photo = currentUserData().photoURL;
        publication.name = currentUserData().displayName;
        post(publication).then();
        modalContainer.style.display = 'none';
      }
    });
    const cerrarModal = muroDiv.querySelector('.cerrar');
    cerrarModal.addEventListener('click', () => {
      modalContainer.style.display = 'none';
    });
  });
  return modalComment;
};
