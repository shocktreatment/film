import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { Notify } from 'notiflix';

const firebaseConfig = {
  apiKey: 'AIzaSyC_ZqRh92a1imNlrZFI2VN7cIY_kE_5IEk',
  authDomain: 'filmoteka-e6aa9.firebaseapp.com',
  databaseURL:
    'https://filmoteka-e6aa9-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-e6aa9',
  storageBucket: 'filmoteka-e6aa9.appspot.com',
  messagingSenderId: '849621855404',
  appId: '1:849621855404:web:d78cfb69a016a21821c309',
};

const app = initializeApp(firebaseConfig);

// gives us an auth instance
const auth = getAuth(app);

async function createNewUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

async function signIn(email, password) {
  try {
    await setPersistence(auth, browserSessionPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

function checkAuthStatus() {
  return new Promise((resolve, reject) => {
    try {
      onAuthStateChanged(auth, user => {
        resolve(user);
      });
    } catch {
      reject('api failed');
    }
  });
}

async function currentUser() {
  const user = await checkAuthStatus();
  return user;
}

function signOutUser() {
  signOut(auth)
    .then(() => {
      Notify.success('Logout success');
      window.location.href = './index.html';
    })
    .catch(error => {
      Notify.success('Logout error');
    });
}

export { signIn, createNewUser, signOutUser, currentUser };
