import { Home } from './home.js';
import { Register } from './register.js';
import { Muro } from './muro.js';

export const Router = () => {
  const divRoot = document.getElementById('root');
  const hash = window.location.hash;
  divRoot.innerHTML = null;
  if (!hash || hash === '#') {
    divRoot.appendChild(Home());
  } else if (hash === '#Register') {
    divRoot.appendChild(Register());
  } else if (hash === '#Muro') {
    divRoot.appendChild(Muro());
  }
};
