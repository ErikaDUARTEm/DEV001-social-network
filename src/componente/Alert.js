export const showErrorMessage = (message, idSpan) => {
  idSpan.style.display = 'block';
  idSpan.textContent = message;
};
