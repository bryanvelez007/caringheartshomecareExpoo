import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCnVHZ8uAY0G3jWvlRmRmQ8mx2bF4WVzIk",
  authDomain: "react-native-app-22840.firebaseapp.com",
  projectId: "react-native-app-22840",
  storageBucket: "react-native-app-22840.appspot.com",
  messagingSenderId: "174260943938",
  appId: "1:174260943938:web:c4954a0cc3ad1ab4fb01db",
  measurementId: "G-RVRSYS1CD5"
  };
  
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };