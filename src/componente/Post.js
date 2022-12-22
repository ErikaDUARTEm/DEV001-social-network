import {
  listener,
  currentUserData,
  getPost,
  update,
  deletePost,
} from '../lib/autentication.js';

export const Post = (muroDiv) => {
  listener((res) => {
    const muro2 = muroDiv.querySelector('.muro');
    let html = '';
    const comentOrder = [];
    res.forEach((doc) => {
      const coment2 = doc.data();
      comentOrder.push(coment2);
      // comentOrder.sort((a, b) => b.fecha - a.fecha);
      // comentOrder.forEach((comentario) => {
      //   console.log(comentOrder);
      html += `
        <div class='container-comment'>
        <div class= 'user-content'>
        <div class= 'content'>
        <span class= 'userActive'><img src='${coment2.photo}' 
        alt='cuenta' class='account'></span>
        <span class= 'userName'>${coment2.name} </span>
        </div>
        ${currentUserData().uid === coment2.uid ? `<button class = 'btnEdit' 
        data-id =${doc.id}>
        <span class="material-symbols-outlined span"><img src="img/edit.png" 
        alt="editar" class="editar"></span></button>` : ''}
        </div> 
        <div class= 'comment-publish'>
        <p>${coment2.coment}</p>
        </div>
        <div class='iconos'>
        <button class='buttonLike' data-id = ${doc.id}>
        <span class='icon'><i class="fa-regular fa-heart like"></i>
        </span>
        <span class='count'>${coment2.likes.length}</span>
        </button>
        ${currentUserData().uid === coment2.uid ? `<button class='btnDelete'
        data-id = ${doc.id}>
        <span class='material-symbols-outlined'><img src='img/delete.png' 
        alt='delete'class='delete'></span></button>` : ''}
        </div>
        </div>`;
      muro2.innerHTML = html;
      //});
      // const formModal = muro2.querySelector('.comment');
      // const textareaModal = .querySelector('#newPost');

     export const btnEdit = muro2.querySelectorAll('.btnEdit');
      btnEdit.forEach((edit) => {
        edit.addEventListener('click', () => {
          const id = edit.dataset.id;
          console.log(id);
          getPost(id).then((res) => {
            console.log(res.data());
            // textareaModal[formModal].value = docEdit.coment;
            // console.log(textareaModal);
          });
        });
      });
      const btnDelete = muro2.querySelectorAll('.btnDelete');
      btnDelete.forEach((btn) => {
        btn.addEventListener('click', () => {
          deletePost(btn.dataset.id)
            .then(() => {
              console.log('eliminada');
            })
            .catch(() => {
              console.log('error no se eliminó');
            });
        });
      });
      const like = muro2.querySelectorAll('.buttonLike');
      like.forEach((likes2) => {
        likes2.addEventListener('click', (e) => {
          const id = likes2.dataset.id;
          e.target.style.color = 'red';
          const corazon = muro2.querySelector('.fa-heart');
          if (corazon.style.color === '') {
            corazon.style.color = 'red';
          }
          getPost(id).then((promise) => {
            let likes = promise.data().likes;
            if (likes.lenght === 0) {
              likes.push(currentUserData().email);
            } else if (!likes.includes(currentUserData().email)) {
              likes.push(currentUserData().email);
            } else {
              likes = likes.filter(
                (email) => !email.includes(currentUserData().email)
              );
            }
            update(id, { likes });
          });
        });
      });
    });
  });
  return Post;
};
