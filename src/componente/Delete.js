/* eslint-disable no-alert */
import { deletePost } from '../lib/firebase.js';

export const Delete = (muro2) => {
  const btnDelete = muro2.querySelectorAll('.btnDelete');
  btnDelete.forEach((btnD) => {
    btnD.addEventListener('click', () => {
      // eslint-disable-next-line no-restricted-globals
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
