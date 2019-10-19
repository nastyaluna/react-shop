import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBF33mv9w57-9NPqfrP2BONPCmuMF6mQFg",
  authDomain: "react-shop-by-luna.firebaseapp.com",
  databaseURL: "https://react-shop-by-luna.firebaseio.com",
  projectId: "react-shop-by-luna",
  storageBucket: "react-shop-by-luna.appspot.com",
  messagingSenderId: "532372385298",
  appId: "1:532372385298:web:06a8882c227dceb05132cb",
  measurementId: "G-0P0T2Q3BBK"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});


export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  // приходит uid юзера
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // ищем в базе юзера с таким id
  const snapShot = await userRef.get();

  // если не находим в базе юзера, создаем нового
  if(!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('Error while creating new user');
    }
  }

  return userRef;
};

export default firebase;