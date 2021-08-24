import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD2UDREA2W1XuuyR05ZL1NBystByUIXkGA",
    authDomain: "cara-90615.firebaseapp.com",
    projectId: "cara-90615",
    storageBucket: "cara-90615.appspot.com",
    messagingSenderId: "908439288493",
    appId: "1:908439288493:web:bb906a0326b0326f442424"
  };

  const fire= firebase.initializeApp(firebaseConfig);

  export default fire;