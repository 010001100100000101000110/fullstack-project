import './css/FrontPage.css';
import { Link } from 'react-router-dom';

/**
 * page which allows the user to choose a role in the app
 */
export default function FrontPage() {
    return (
        <div id="front-page">
            <h1>Choose your role:</h1>

            <div id="role-links">
                <Link to="/login" className="role-link">
                    <button id="choose-admin-btn">
                        <h2>Admin</h2>
                        <h3>Stuff:</h3>
                        <ul>
                            <li>add new wordpairs</li>
                            <li>edit existing wordpairs</li>
                            <li>delete existing wordpairs</li>
                        </ul>
                    </button>
                </Link>
                <Link to="/student" className="role-link">
                    <button id="choose-student-btn">
                        <h2>Student</h2>
                        <h3>Stuff:</h3>
                        <ul>
                            <li>practice words</li>
                            <li>three languages</li>
                            <li>choose the language to write</li>
                        </ul>
                    </button>
                </Link>
            </div>
        </div>
    )
}