// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 💡 لازم نستدعي Firebase Auth

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpCwHoELKzQa6niiY5eT2jynkwCt4Yad4",
  authDomain: "signupapp-937a4.firebaseapp.com",
  projectId: "signupapp-937a4",
  storageBucket: "signupapp-937a4.firebasestorage.app",
  messagingSenderId: "313873966333",
  appId: "1:313873966333:web:637e77766419f1f989ca94",
  measurementId: "G-PDJH6FY47Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // 💡 إضافة Authentication

export { auth }; // 🏆 تصدير الـ auth عشان نستخدمه في باقي المشروع
