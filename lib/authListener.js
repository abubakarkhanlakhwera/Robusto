import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function initAuthListener(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
