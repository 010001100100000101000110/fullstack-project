//page which allows the user to choose a practicing mode
import './css/FrontPage.css';
import { Link } from 'react-router-dom';
//**
//
//
//
// */
export default function StudentMainPage() {

    return (
        <div>
            <div>
                <h1>What will you do?</h1>
                <Link to="/student/play-all">
                    <button id="play-all-btn">
                        Play all words
                    </button>
                </Link>
                <Link to="/student">
                    <button id="play-tag-btn">
                        Play by tag
                    </button>
                </Link>

            </div>
        </div>
    )
}