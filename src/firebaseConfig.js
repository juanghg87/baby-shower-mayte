import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA7Q-sZQjEmzvB0AmjUhcVfAdQbkR54ono",
    authDomain: "baby-shower-mayte.firebaseapp.com",
    projectId: "baby-shower-mayte",
    storageBucket: "baby-shower-mayte.firebasestorage.app",
    messagingSenderId: "904822204731",
    appId: "1:904822204731:web:4b8760496523ac629a2f1e",
    measurementId: "G-CY4EYK8QLM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {
    db,
    collection,
    addDoc
};
