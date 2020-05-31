import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCxVgWoi4MystF9vhRpxFPl2iCCH_7h3vc",
  authDomain: "seeder-70005.firebaseapp.com",
  databaseURL: "https://seeder-70005.firebaseio.com",
  projectId: "seeder-70005",
  storageBucket: "seeder-70005.appspot.com",
  messagingSenderId: "519006554519",
  appId: "1:519006554519:web:6c2ec700f7851f88185cd2",
  measurementId: "G-1GL5GNWGKS"
};
const firebaseApp = firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();