// firebaseConfig.js
import { initializeApp } from "firebase/app";
// Importa las funciones específicas de Firestore que vas a usar
import { getFirestore, collection, addDoc } from "firebase/firestore"; // ¡Esta línea es clave!

// Tu configuración de la app web de Firebase (ya la tienes correcta)
const firebaseConfig = {
    apiKey: "AIzaSyA7Q-sZQjEmzvB0AmjUhcVfAdQbkR54ono",
    authDomain: "baby-shower-mayte.firebaseapp.com",
    projectId: "baby-shower-mayte",
    storageBucket: "baby-shower-mayte.firebasestorage.app",
    messagingSenderId: "904822204731",
    appId: "1:904822204731:web:4b8760496523ac629a2f1e",
    measurementId: "G-CY4EYK8QLM" // Puedes remover esta línea si no usas Analytics
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtén una referencia al servicio de Firestore
const db = getFirestore(app); // ¡También esta línea es fundamental!

// Exporta lo que necesitas usar en otros componentes
export {
    db,
    collection,
    addDoc
};
