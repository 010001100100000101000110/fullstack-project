import './css/AdminLoginPage.css';
import { useState } from "react";

/**
 * page which allows the admin to log in and continue in the app
 */
export default function AdminLoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showMessage, setShowMessage] = useState(false);

    /**
     *
     */
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
        <div id="login-container">
            <h1>Log in</h1>

            <h3>Username:</h3>
            <input
                id="input-username"
                type="text"
                placeholder="username"
                onChange={(event) => setUsername(event.target.value)}
            />
            <h3>Password:</h3>
            <input
                id="input-password"
                type="password"
                placeholder="password"
                onChange={(event) => setPassword(event.target.value)}
            />

            <button id="login-btn" onClick={handleLogin}>
                Log in
            </button>

            {showMessage &&
            <div>
                <p id="login-msg">wrong login info! correct id is u: admin, p: admin. hope this helps!</p>
            </div>
            }

        </div>
    )
}