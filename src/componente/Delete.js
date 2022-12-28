import { deletePost } from '../lib/autentication.js';

export const Delete = (muro2) => {
  const btnDelete = muro2.querySelectorAll('.btnDelete');
  btnDelete.forEach((btnD) => {
    btnD.addEventListener('click', () => {
      const confirmar = confirm('¿Estas seguro de eliminar el comentario?');
      if (confirmar === true) {
        deletePost(btnD.dataset.id)
          .then(() => {
          })
          .catch(() => {
          });
      }
    });
  });
};
