import { signIn, signOut } from '../firebase/firebase';

export const startLogin = () => {
    return async () => {
        try {
            await signIn();
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
            await signOut();
        } catch (e) {
            console.log(e);
        }
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});