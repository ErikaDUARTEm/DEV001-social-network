export const Muro = () => {
  const muroDiv = document.createElement('section');
  muroDiv.classList.add('sectionMuro');
  muroDiv.innerHTML = `
  <header>
  <nav>
    <img class="logoMuro" src="img/logo.png" alt="logo">
    <span class="material-symbols-outlined"><img src="img/menu_open.png" alt="menu" class="material-symbols-outlined"></span>
  </nav>
  </header>
  <section class="muro">
    <textarea width:"200 heigth:"100"></textarea>
    <textarea width:"200 heigth:"100"></textarea>
    <textarea width:"200 heigth:"100"></textarea>
    <textarea width:"200 heigth:"100"></textarea>
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
      <span class= 'userActive'><img src='img/account_circle.png' alt='cuenta' class='account'></span>
      <span class= 'userName'>NOMBRE</span>
      </div>
      <form class='comment'>
      <textarea class='newPost' placeholder='Escribe un comentario...'></textarea>
      <button type='button' class='publish'>Publicar</button>
      </form>
    </div>
    `;
  });

  return muroDiv;
};
