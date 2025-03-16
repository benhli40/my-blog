import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "./Login.css";

export default function Login({ user }) {
const [email, setEmail] = useState(""); // ✅ Fix: Ensure useState is used
const [password, setPassword] = useState("");

const handleSignUp = async () => {
    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }
    try {
        await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up with:", email); // ✅ Email is now being used
    } catch (error) {
        alert(error.message);
    }
};

const handleLogin = async () => {
    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }
    try {
        await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in with:", email); // ✅ Email is now being used
    } catch (error) {
        alert(error.message);
    }
};

const handleLogout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        alert(error.message);
    }
};

return (
    <div className="login-container">
        {user ? (
        <div className="auth-buttons">
            <p>Welcome, {user.email}!</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        ) : (
        <div className="auth-buttons">
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // ✅ Fix: Ensures email is read
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // ✅ Fix: Ensures password is read
            />
            <button onClick={handleLogin} className="login-button">Log In</button>
            <button onClick={handleSignUp} className="signup-button">Sign Up</button>
        </div>
        )}
    </div>
    );
}

