import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Loading from "./Loading";
import './css/StudentPreferencesSelection.css'
/**
 *
 * @returns
 */
export default function StudentPreferencesSelection() {
    //boolean determining, if user is displayed a choice of language pairs(eng-fin, eng-swe, fin-swe)
    const [askLanguages, setAskLanguages] = useState(true);
    //boolean determining, if user is displayed a choice of which of the chosen languages do they want to practice writing
    const [askWritingLanguage, setAskWritingLanguage] = useState(false);

    const [askTag, setAskTag] = useState(false);
    const [tags, setTags] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState(1);

    //holds the two languages the user picks
    const [languages, setLanguages] = useState({ lang1: "english", lang2: "finnish" });
    //the language the user wants to write
    const [writingLanguage, setWritingLanguage] = useState("finnish");

    const handleTagChange = (tag) => {
        setSelectedTag(tag);
    }
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const apiUrl = `http://localhost:3000/api/tags`;
                const response = await axios.get(apiUrl);
                setTags(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching tags: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTags();
    }, []);

    if(isLoading) {
        return <Loading />;
    }

    const handlePreferences = () => {
        const preferences = {
            languages,
            writingLanguage,
            tagId: selectedTag
        };
        localStorage.setItem("preferences", JSON.stringify(preferences));
    }

    const handleTagModeSelect = () => {
        setAskTag(true);
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

    //Ask user which two languages they'd like to practice
    if (askLanguages) {
        return (
            <div>
                <h2>Which language pair would you like to practice?</h2>
                <div className="lang-select">
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

    //Ask user which language of the chosen two they'd like to practice
    if (askWritingLanguage) {
        return (
            <div className="lang-select">
                <h2>Which language do you want to practice writing?</h2>
                <button onClick={() => handleChoice(languages.lang1)}>{languages.lang1}</button>
                <button onClick={() => handleChoice(languages.lang2)}>{languages.lang2}</button>
            </div>
        )
    }

    //Ask user which tag they'd like to practice
    if (askTag) {
        return (
            <div id="tag-selection">
                <h2>Choose the tag you want to practice!</h2>
                <select name="tag" onChange={event => handleTagChange(event.target.value)}>
                    {tags.map((tag, index) => (
                        <option key={index} value={tag.id} >{tag.name}</option>
                    ))}
                </select>
                <Link to="/student/play-filtered">
                    <button onClick={handlePreferences}>Practice!</button>
                </Link>
            </div>
        )
    }

    //if language preferences are set, ask user which practice mode they want
    if (!askLanguages && !askWritingLanguage) {
        return (
            <div>
                <h1>Choose practice mode</h1>

                <div id="mode-selection">
                    <Link to="/student/play-all">
                        <button id="play-all-btn" onClick={handlePreferences}>
                            Play all words
                        </button>
                    </Link>
                    <button id="play-tag-btn" onClick={handleTagModeSelect}>
                        Play by tag
                    </button>
                </div>
            </div>
        )
    }


}