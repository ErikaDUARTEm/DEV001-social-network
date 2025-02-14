import { Delete } from './Delete.js';
import { like } from './like.js';
import {
  listener,
  getPost,
  update,
  auth,
} from '../lib/firebase.js';

export const Post = (muroDiv) => {
  listener((res) => {
    const muro2 = muroDiv.querySelector('.muro');
    let html = '';
    const resSortedArr = [];
    res.forEach((doc) => resSortedArr.push({ referece: doc, data: doc.data() }));
    resSortedArr.sort((a, b) => b.data.fecha - a.data.fecha);
    resSortedArr.forEach((docObj) => {
      const coment2 = docObj.data;
      html += `
        <div class='container-comment'>
        <div class= 'user-content'>
        <div class= 'content'>
        <span class= 'userActive'><img src='${coment2.photo}' 
        alt='cuenta' referrerpolicy="no-referrer" class='account'></span>
        <span class= 'userName'>${coment2.name} </span>
        </div>
        ${auth.currentUser.uid === coment2.uid ? `<button class = 'btnEdit' 
        data-id =${docObj.referece.id}>
        <span class="material-symbols-outlined span"><img src="https://raw.githubusercontent.com/ErikaDUARTEm/DEV001-social-network/main/src/img/edit.png" 
        alt="editar" class="editar"></span></button>` : ''}
        </div> 
        <div class= 'comment-publish'>
        <p class= 'coment'>${coment2.coment}</p>
        </div>
        <div class='iconos'>
        <button class='buttonLike' data-id = ${docObj.referece.id}>
        <span class='icon'><i class="fa-regular fa-heart like ${coment2.likes.includes(auth.currentUser.email) ? 'true' : 'false'}"></i>
        </span>
        <span class='count'>${coment2.likes.length}</span>
        </button>
        ${auth.currentUser.uid === coment2.uid ? `<button class='btnDelete'
        data-id = ${docObj.referece.id}>
        <span class='material-symbols-outlined'><img src='https://raw.githubusercontent.com/ErikaDUARTEm/DEV001-social-network/main/src/img/delete.png' 
        alt='delete'class='delete'></span></button>` : ''}
        </div>
        </div>`;
      muro2.innerHTML = html;
      const btn = muro2.querySelectorAll('.btnEdit');
      btn.forEach((edit) => {
        edit.addEventListener('click', () => {
          const id = edit.dataset.id;
          getPost(id).then((promise) => {
            const coment = promise.data().coment;
            let htmlmodal = '';
            htmlmodal = `
          <div class='content-modal'>
          <div class= 'user-content2'>
          <span class= 'userActive'><img src='${auth.currentUser.photoURL}' 
          alt='cuenta' class='account'></span>
          <span class= 'userName'>${auth.currentUser.displayName}</span>
          </div>
          <form class='comment' id='comment'>
          <textarea required type='text' class='newPost'>${coment}
          </textarea>
          <button type='button' class='publish'>Editar</button>
          </form>
          </div>
          `;
            muro2.innerHTML = htmlmodal;

            const comentEdit = muro2.querySelector('.newPost');
            const buttonEdit = muro2.querySelector('.publish');
            buttonEdit.addEventListener('click', () => {
              const newPost = {};
              newPost.coment = comentEdit.value;
              update(id, newPost);
            });
          });
        });
      });
      Delete(muro2);
      like(muro2);
      return Post;
    });
  });
};
