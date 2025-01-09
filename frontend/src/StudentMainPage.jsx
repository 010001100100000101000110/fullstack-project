import './css/StudentMainPage.css';
import { Link } from 'react-router-dom';

/**
 * page which allows the user to choose a practicing mode
 */
export default function StudentMainPage() {

    const handleClick = () => {
        window.location.href = "/";
    }

    return (
        <div>
            <div>
                <div>
                    <button onClick={handleClick}>{"<"}</button>
                    <h1>What will you do?</h1>
                </div>

                <div id="mode-selection">
                    <Link to="/student/play-all">
                        <button id="play-all-btn">
                            Play all words (2 languages)
                        </button>
                    </Link>
                    <Link to="/student/play-all">
                        <button id="play-all-btn">
                            Play all words (3 languages)
                        </button>
                    </Link>
                    <Link to="/student">
                        <button id="play-tag-btn">
                            Play by tag
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}