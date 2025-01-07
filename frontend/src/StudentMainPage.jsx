//page which allows the user to choose a practicing mode
import './css/FrontPage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function StudentMainPage() {

    const [showQuestion, setShowQuestion] = useState(false);

    const setTrue = () => {
        setShowQuestion(true);
    }
    return (
        <div>
            {showQuestion &&
                <div>
                    <h2>which language do you want to practice writing?</h2>

                    <button>English</button>
                    <button>Finnish</button>
                    <button>Swedish</button>


                    <div>
                        <h2>what tag would you like to practice?</h2>
                    </div>
                </div>


            }
            {!showQuestion &&
                <div>
                    <h1>What will you do?</h1>
                    <button id="play-all-btn" onClick={setTrue}>
                        Play all words
                    </button>
                    <button id="play-tag-btn" onClick={setTrue}>
                        Play by tag
                    </button>
                    {/* <Link to="/student/play-all">
                        <button id="play-all-btn" onClick={setTrue}>
                            Play all words
                        </button>
                    </Link>
                    <Link to="/student">
                        <button id="play-tag-btn" onClick={setTrue}>
                            Play by tag
                        </button>
                    </Link> */}

                </div>
            }

        </div>
    )
}