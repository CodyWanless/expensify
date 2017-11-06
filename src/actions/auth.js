import { firebase, googleAuthProvider } from '../firebase/firebase';

export const startLogin = () => {
    return async () => {
        try{ 
            await firebase.auth().signInWithPopup(googleAuthProvider);
        } catch (e) {
            console.log(e);
        }
    };
};

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLogout = () => {
    return async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});