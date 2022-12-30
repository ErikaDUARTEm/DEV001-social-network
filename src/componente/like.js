import
{
  getPost,
  update,
  auth,
} from '../lib/firebase.js';

export const like = (muro2) => {
  const buttonLike = muro2.querySelectorAll('.buttonLike');
  buttonLike.forEach((likes2) => {
    likes2.addEventListener('click', () => {
      const id = likes2.dataset.id;
      getPost(id).then((promise) => {
        let likes = promise.data().likes;
        if (likes.lenght === 0) {
          likes.push(auth.currentUser.email);
        } else if (!likes.includes(auth.currentUser.email)) {
          likes.push(auth.currentUser.email);
        } else {
          likes = likes.filter(
            (email) => !email.includes(auth.currentUser.email),
          );
        }
        update(id, { likes });
      });
    });
  });
};
