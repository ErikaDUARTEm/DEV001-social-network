import { deletePost } from '../lib/autentication.js';

export const Delete = (muro2) => {
  const btnDelete = muro2.querySelectorAll('.btnDelete');
  btnDelete.forEach((btnD) => {
    btnD.addEventListener('click', () => {
      deletePost(btnD.dataset.id)
        .then(() => {
          console.log('eliminada');
        })
        .catch(() => {
          console.log('error no se eliminó');
        });
    });
  });
};
