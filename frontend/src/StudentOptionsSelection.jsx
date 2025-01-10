import { useState } from "react";
import { Link } from 'react-router-dom';
/**
 *
 * @returns
 */
export default function StudentOptionsSelection() {
    //boolean determining, if user is displayed a choice of language pairs(eng-fin, eng-swe, fin-swe)
    const [askLanguages, setAskLanguages] = useState(true);
    //boolean determining, if user is displayed a choice of which of the chosen languages do they want to practice writing
    const [askWritingLanguage, setAskWritingLanguage] = useState(false);
    //holds the two languages the user picks
    const [languages, setLanguages] = useState({ lang1: "english", lang2: "finnish" });
    //the language the user wants to write
    const [writingLanguage, setWritingLanguage] = useState("finnish");

    const handlePreferences = () => {
        console.log("HANDLING PREFERENCES");
        const preferences = {
            languages,
            writingLanguage
        };
        localStorage.setItem("preferences", JSON.stringify(preferences));
    }

    function handleLanguageSelect(lang1, lang2) {
        setLanguages({ lang1, lang2 });
        setAskLanguages(false);
        setAskWritingLanguage(true);
    }

    function handleChoice(language) {
        setAskWritingLanguage(false);
        setWritingLanguage(language);
    }

    if (askLanguages) {
        return (
            <div>
                <h2>I want to practice...</h2>
                <div id="lang-select">
                    <button onClick={() => handleLanguageSelect("english", "swedish")}>
                        English - Swedish
                    </button>
                    <button onClick={() => handleLanguageSelect("english", "finnish")}>
                        English - Finnish
                    </button>
                    <button onClick={() => handleLanguageSelect("finnish", "swedish")}>
                        Finnish - Swedish
                    </button>
                </div>

            </div>
        )
    }

    if (askWritingLanguage) {
        return (
            <div>
                <h2>Which language do you want to practice writing?</h2>
                <button onClick={() => handleChoice(languages.lang1)}>{languages.lang1}</button>
                <button onClick={() => handleChoice(languages.lang2)}>{languages.lang2}</button>
            </div>
        )
    }

    if (!askLanguages && !askWritingLanguage) {
        return (
            <div>
                <div>
                    <h1>Choose practice mode</h1>
                </div>

                <div id="mode-selection">
                    <Link to="/student/play-all">
                        <button id="play-all-btn" onClick={handlePreferences}>
                            Play all words (2 languages)
                        </button>
                    </Link>
                    <Link to="/student/play-filtered">
                        <button id="play-tag-btn" onClick={handlePreferences}>
                            Play by tag
                        </button>
                    </Link>
                </div>
            </div>
        )

    }
}