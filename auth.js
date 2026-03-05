import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.login = async () => {
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value;
    const btn = document.querySelector('button');

    if (!email || !pass) return alert("Please enter both email and password.");

    btn.disabled = true;
    btn.innerText = "Authenticating...";

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;
        const now = new Date().toLocaleString('en-GB');
        
        try {
            await updateDoc(doc(db, "users", user.uid), { lastLogin: now });
        } catch (dbError) {
            console.warn("User document not found.");
        }
        window.location.href = "dashboard.html"; 
    } catch (error) {
        btn.disabled = false;
        btn.innerText = "Login";
        alert("Login Failed: " + error.message);
    }
};
