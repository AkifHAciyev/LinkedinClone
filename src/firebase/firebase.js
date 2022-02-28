import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCeUJGVd9EElqwxpyEB2gCVkJEtCTyJxJ8',
	authDomain: 'linkedin-cbec8.firebaseapp.com',
	projectId: 'linkedin-cbec8',
	storageBucket: 'linkedin-cbec8.appspot.com',
	messagingSenderId: '408682001317',
	appId: '1:408682001317:web:d5f7eefd407f20dfb42e4c',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
