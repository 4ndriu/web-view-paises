import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
 
const firebaseConfig = {
  apiKey: "AIzaSyC5l9omD4XyLzKGLiTsp8SylAqsuGmHoo4",
  authDomain: "api-paises-27c98.firebaseapp.com",
  projectId: "api-paises-27c98",
  storageBucket: "api-paises-27c98.firebasestorage.app",
  messagingSenderId: "649723471173",
  appId: "1:649723471173:web:692602bc75990c097d0a2c",
  measurementId: "G-XZZMKLK4T8",
};
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
 