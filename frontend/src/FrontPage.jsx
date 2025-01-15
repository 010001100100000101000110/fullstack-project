import './css/FrontPage.css';
import { Link } from 'react-router-dom';

/**
 * FrontPage component allows the user to select a role (Admin or Student) in the app.
 * The page provides two buttons linking to the login page for the Admin role
 * and a student page for the Student role.
 *
 * @returns JSX element representing the front page with role selection options.
 */
export default function FrontPage() {
    return (
        <div id="front-page">
            <h1>Choose your role:</h1>

            <div id="role-links">
                {/* Link to the login page for the Admin role */}
                <Link to="/login" className="role-link">
                    <button id="choose-admin-btn">
                        <h2>Admin</h2>
                        {/* List of features available to the Admin */}
                        <div>
                            <p>Create learning material!</p>
                            <p>Add, edit and delete word pairs</p>
                            <p>Add, edit and delete tags</p>
                        </div>
                    </button>
                </Link>
                {/* Link to the student page for the Student role */}
                <Link to="/student" className="role-link">
                    <button id="choose-student-btn">
                        <h2>Student</h2>
                        {/* List of features available to the Student */}
                        <div>
                            <p>Practice words</p>
                            <p>Practice words by tag</p>
                            <p>Three languages!</p>
                            <p>Choose the language you want to write</p>
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    )
}