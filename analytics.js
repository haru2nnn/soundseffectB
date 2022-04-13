  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAZzl1MhdFW2QBj-lChq14RDQE7G01qpEs",
    authDomain: "soundseffectb.firebaseapp.com",
    projectId: "soundseffectb",
    storageBucket: "soundseffectb.appspot.com",
    messagingSenderId: "701970127360",
    appId: "1:701970127360:web:ef0c505f0fbc74497616e5",
    measurementId: "G-27T940DWVF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);