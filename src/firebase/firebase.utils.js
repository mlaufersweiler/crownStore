import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAV5vDnLaxfq1G-BAM1T_aidGTiSNEX_mE",
  authDomain: "crwn-db-a8bc1.firebaseapp.com",
  databaseURL: "https://crwn-db-a8bc1.firebaseio.com",
  projectId: "crwn-db-a8bc1",
  storageBucket: "crwn-db-a8bc1.appspot.com",
  messagingSenderId: "1022894175808",
  appId: "1:1022894175808:web:6b31f624912d88ba5d91a5",
  measurementId: "G-F9NXT30Z4Y"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
