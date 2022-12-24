import { signIn, signOut } from '../firebase/firebase';

export const startLogin = () => async () => {
  try {
    await signIn();
  } catch (e) {
    console.log(e);
  }
};

export const login = (uid) => ({
  type: 'LOGIN',
  uid,
});

export const startLogout = () => async () => {
  try {
    await signOut();
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => ({
  type: 'LOGOUT',
});
