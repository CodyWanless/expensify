import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, get, remove, update, push } from 'firebase/database';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

const firebaseApp = initializeApp(config);

const database = getDatabase(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const handleAuthStateChange = (onAuthenticated, onSignOut) => {
    onAuthStateChanged(auth, user => {
        if (user) {
            onAuthenticated(user);
        } else {
            onSignOut();
        }
    });
}

const signIn = async () => {
    await signInWithPopup(auth, googleAuthProvider);
};

const signOut = async () => {
    await auth.signOut();
}

const expenseRepository = {
    insert: async (expense) => {
        const dbRef = ref(database, `users/${auth.currentUser.uid}/expenses`);
        const pushRef = await push(dbRef);
        await set(pushRef, expense);

        return pushRef.key;
    },
    getSnapshot: async () => {
        const dbRef = ref(database, `users/${auth.currentUser.uid}/expenses`);
        return await get(dbRef, 'value');
    },
    update: async (id, expense) => {
        const dbRef = ref(database, `users/${auth.currentUser.uid}/expenses/${id}`);
        await update(dbRef, expense);
    },
    delete: async (id) => {
        const dbRef = ref(database, `users/${auth.currentUser.uid}/expenses/${id}`);
        await remove(dbRef);
    },
};

export { handleAuthStateChange, signIn, signOut, expenseRepository as default };