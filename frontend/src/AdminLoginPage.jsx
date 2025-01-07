//page which allows the admin to log in and continue in the app

//import './css/AdminLoginPage.css';
import { Link } from 'react-router-dom';
import { useState } from "react";

export default function AdminLoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showMessage, setShowMessage] = useState(false);

    const handleLogin = () => {
        if (username !== "admin" || password !== "admin") {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 4000);
        } else {
            window.location.href = "/admin";
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <input
                type="text"
                placeholder="username"
                onChange={(event) => setUsername(event.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(event) => setPassword(event.target.value)}
            />

            <button id="login-btn" onClick={handleLogin}>
                Log in
            </button>
            {/* <Link to="/admin">
                <button id="login-btn" onClick={handleLogin}>
                    Log in
                </button>
            </Link> */}

            {showMessage &&
            <div>
                <p>wrong login info! correct id is u: admin, p: admin. hope this helps!</p>
            </div>
            }

        </div>
    )
}