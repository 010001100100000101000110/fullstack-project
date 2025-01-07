//page which allows the user to choose a practicing mode
import './css/FrontPage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

export default function StudentMainPage() {

    return (
        <div>
            <div>
                <h1>What will you do?</h1>
                {/* <button id="play-all-btn" onClick={setTrue}>
                        Play all words
                    </button>
                    <button id="play-tag-btn" onClick={setTrue}>
                        Play by tag
                    </button> */}
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