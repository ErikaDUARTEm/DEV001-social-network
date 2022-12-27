import
{
  getPost,
  update,
  currentUserData,
} from '../lib/autentication.js';

export const like = (muro2) => {
  const buttonLike = muro2.querySelectorAll('.buttonLike');
  buttonLike.forEach((likes2) => {
    likes2.addEventListener('click', () => {
      const id = likes2.dataset.id;
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
};
