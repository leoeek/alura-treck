import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9UrKLsl4yFUnOvwwtQAXCseoCBJ0yO3E",
  authDomain: "tracker-manager-2ae14.firebaseapp.com",
  projectId: "tracker-manager-2ae14",
  storageBucket: "tracker-manager-2ae14.appspot.com",
  messagingSenderId: "565891708084",
  appId: "1:565891708084:web:604472b1ee88af541c53e1",
  measurementId: "G-LYQ7HSBN14"
};

initializeApp(firebaseConfig);
const firestore = getFirestore();
export default firestore