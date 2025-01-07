//page which allows the user to choose a role in the app
import './css/FrontPage.css';
import { Link } from 'react-router-dom';

export default function FrontPage() {
    return (
        <div>
            <h1>Choose your role:</h1>

            <Link to="/login">
                <button id="choose-admin-btn">
                    Admin
                </button>
            </Link>
            <Link to="/student">
                <button id="choose-student-btn">
                    Student
                </button>
            </Link>

        </div>
    )
}