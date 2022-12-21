import {
  post,
  listener,
  signOut2,
  getPost,
  currentUserData,
  update,
  deletePost,
} from '../lib/autentication.js';

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
    <span class="material-symbols-outlined"><img src="img/account_circle.png" alt="cuenta" class="account"></span>
    </nav>
  </footer>
  `;
  const add = muroDiv.querySelector('.add');
  add.addEventListener('click', () => {
    const modal = muroDiv.querySelector('.modal');
    modal.style.display = 'flex';
    modal.innerHTML = `
    <div class='content-modal'>
      <div class= 'cancel'>
      <span class="material-symbols-outlined"><img src='img/cancel.png' class='cerrar'></span>
      </div>
      <div class= 'user-content'>
      <span class= 'userActive'><img src='${currentUserData().photoURL}' alt='cuenta' 
      class='account'></span>
      <span class= 'userName'>${currentUserData().displayName}</span>
      </div>
      <form class='comment'>
      <textarea required type='text' class='newPost' placeholder='Escribe un comentario...'>
      </textarea>
      <button type='button' class='publish'>Publicar</button>
      </form>
    </div>
    `;
    const publish = muroDiv.querySelector('.publish');
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
        modal.style.display = 'none';
      }
    });
    const cerrarModal = muroDiv.querySelector('.cerrar');
    cerrarModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });
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
      <span class= 'userActive'><img src='${coment2.photo}' alt='cuenta' class='account'></span>
      <span class= 'userName'>${coment2.name} </span>
      </div>
      ${currentUserData().uid === coment2.uid ? `<button class = 'btnEdit' data-id =${doc.id}>
      <span class="material-symbols-outlined span"><img src="img/edit.png" alt="editar" 
      class="editar"></span></button>` : ''}
      </div> 
          <div class= 'comment-publish'>
            <p>${coment2.coment}</p>
          </div>
      <div class='iconos'>
        <button class='buttonLike' data-id = ${doc.id}>
        <span class='icon'><img src='img/heart.png' alt='like' class='like'></span>
        <span class='count'>0</span>
      </button>
          ${currentUserData().uid === coment2.uid ? `<button class='btnDelete' data-id = ${doc.id}>
        <span class='material-symbols-outlined' ><img src='img/delete.png' alt='delete' 
        class='delete'></span>
        </button>` : ''}
          </div>
        </div>`;
      muro2.innerHTML = html;
  //});
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
      const heartPaint = () => {
        let clickead = false;
        const count = muro2.querySelectorAll('.count');
        const icon = muro2.querySelectorAll('.icon');
        if (!clickead) {
          clickead = true;
          icon.innerHTML = `
              <img src = 'img/heart-relleno.png' class='like'>`;
          count.textContent++;
        } else if (clickead) {
          clickead = false;
          icon.innerHTML = `
              <img src = 'img/heart.png' class='like'>`;
          count.textContent--;
        }
      };
      const like = muro2.querySelectorAll('.buttonLike');
      like.forEach((likes2) => {
        likes2.addEventListener('click', () => {
          const id = likes2.dataset.id;
          getPost(id).then((promise) => {
            heartPaint();
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
            update(id, { likes: { ...likes, contador: 1 }});
          });
        });
      });
    });
    const home = muroDiv.querySelector('.home');
    home.addEventListener('click', () => {
      window.scrollTo(0, 0);
    });
    const hambur = muroDiv.querySelector('.hambur');
    const menuNavegacion = muroDiv.querySelector('.menu-navegacion');
    hambur.addEventListener('click', () => {
      menuNavegacion.classList.toggle('spread');
    });
  });
  const out = muroDiv.querySelector('.cerrarSesion');
  out.addEventListener('click', () => {
    signOut2().then(() => {
      window.location.hash = '#';
      window.location.reload();
    });
  });
  return muroDiv;
};
