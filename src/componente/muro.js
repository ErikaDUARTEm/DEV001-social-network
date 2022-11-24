export const Muro = () => {
  const muroDiv = document.createElement('div');
  const buttonCerrar = document.createElement('button');

  buttonCerrar.textContent = 'Cerrar sesión';

  muroDiv.appendChild(buttonCerrar);
  return muroDiv;
};
