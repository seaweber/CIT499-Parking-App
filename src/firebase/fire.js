import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCNMpx8XKrrf3eLVHhr7Et9j7vVw6MNVgo",
    authDomain: "cit499-redux-firestore.firebaseapp.com",
    databaseURL: "https://cit499-redux-firestore.firebaseio.com",
    projectId: "cit499-redux-firestore",
    storageBucket: "cit499-redux-firestore.appspot.com",
    messagingSenderId: "725427179284",
    appId: "1:725427179284:web:c08640aff24549694dbc01",
    measurementId: "G-YKM3D9QDPJ"
};

const fire=firebase.initializeApp(firebaseConfig);


export default fire;
