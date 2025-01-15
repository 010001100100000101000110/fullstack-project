import './css/AdminLoginPage.css';
import { useState } from "react";

/**
 * AdminLoginPage component allows the admin to log in to the app.
 * @returns A JSX element representing the login page for the admin.
 */
export default function AdminLoginPage() {

    //State to hold the username entered by the admin
    const [username, setUsername] = useState("");
    //State to hold the password entered by the admin
    const [password, setPassword] = useState("");
    //State to control the visibility of the error message after a failed login
    const [showMessage, setShowMessage] = useState(false);

    /**
     * handleLogin function validates the entered username and password
     * and redirects the user to the admin page
     */
    const handleLogin = () => {
        // Check if the username or password is incorrect
        if (username !== "admin" || password !== "admin") {
            //Show error message for incorrect login
            setShowMessage(true);
            setTimeout(() => {
                //Hide error message after 4 seconds
                setShowMessage(false);
            }, 4000);
        } else {
            //Redirect user to the admin page if login info is correct
            window.location.href = "/admin";
        }
    }

    //Render the login page
    return (
        <div id="login-container">
            <h1>Log in</h1>

            <h3>Username:</h3>
            {/* Username input field */}
            <input
                id="input-username"
                type="text"
                placeholder="username"
                onChange={(event) => setUsername(event.target.value)}/>

            <h3>Password:</h3>
            {/* Password input field */}
            <input
                id="input-password"
                type="password"
                placeholder="password"
                onChange={(event) => setPassword(event.target.value)}/>

            {/* Login button to trigger handleLogin function */}
            <button id="login-btn" onClick={handleLogin}>
                Log in
            </button>

            {/* Display error message if login fails */}
            {showMessage &&
            <div>
                <p id="login-msg">wrong login info! correct id is u: admin, p: admin. hope this helps!</p>
            </div>}

        </div>
    )
}