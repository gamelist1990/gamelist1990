// Firebaseを初期化
const firebaseApp = firebase.initializeApp({
    // APIキーをコピペする
    apiKey: "AIzaSyDMxFGtXdclcx-kjm6cMIY2R8Zcr-DmrG0",
    authDomain: "comment-7fe17.firebaseapp.com",
    projectId: "comment-7fe17",
    storageBucket: "comment-7fe17.appspot.com",
    messagingSenderId: "407281726198",
    appId: "1:407281726198:web:c754e86eba864488de72d7",
    measurementId: "G-17P7B214DM"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();