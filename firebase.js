  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDY7UTvl4YopjLAlUVv5lNDAF-tWa3Zdmg",
    authDomain: "todo-list-2e72d.firebaseapp.com",
    projectId: "todo-list-2e72d",
    storageBucket: "todo-list-2e72d.appspot.com",
    messagingSenderId: "189345184562",
    appId: "1:189345184562:web:e11ca95b701dd7a0bd352b",
    measurementId: "G-ZP7E608VJS"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();
