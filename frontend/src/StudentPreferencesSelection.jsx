import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Loading from "./Loading";
import './css/StudentPreferencesSelection.css'

/**
 * StudentPreferencesSelection component allows the user to choose their preferences for language practice.
 * It prompts the user to select a language pair, the language they want to practice writing, and optionally a tag.
 * Based on their choices, the student is directed to either play all words or play words filtered by tag.
 *
 * @returns The JSX elements for displaying the preferences selection.
 */
export default function StudentPreferencesSelection() {

    //States to track the different steps of the user preference selection process
    //Step 1: Ask for language pair
    const [askLanguages, setAskLanguages] = useState(true);
    //State to store the selected language pair
    const [languages, setLanguages] = useState({ lang1: "english", lang2: "finnish" });
    //Step 2: Ask for writing language
    const [askWritingLanguage, setAskWritingLanguage] = useState(false);
    //the language the user wants to write
    const [writingLanguage, setWritingLanguage] = useState("finnish");
    //Step 3: Ask for tag selection
    const [askTag, setAskTag] = useState(false);
    //State tracking the user's chosen tag's ID
    const [selectedTagId, setSelectedTagId] = useState(1);

    //State to hold all tags
    const [tags, setTags] = useState(null);
    //State to track if data is still being fetched
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        /**
         * fetchTags function fetches the list of tags from the backend API
         */
        const fetchTags = async () => {
            try {
                //Set loading state to show loading component while data is being fetched
                setIsLoading(true);
                //Fetch the tags
                const response = await axios.get(`http://localhost:3000/api/tags`);
                //Store fetched tags in a state
                setTags(response.data);
            } catch (error) {
                //Log any errors occurring during fetch
                console.error("Error fetching tags: ", error.message);
            } finally {
                //Set state to hide loading component
                setIsLoading(false);
            }
        }
        fetchTags();
    }, []);

    //Render Loading component if data is being fetched
    if(isLoading) {
        return <Loading />;
    }

    /**
     * handlePreferences sets and saves the user's preferences to local storage
     */
    const handlePreferences = () => {
        const preferences = {
            languages,
            writingLanguage,
            tagId: selectedTagId
        };
        localStorage.setItem("preferences", JSON.stringify(preferences));
    }

    /**
     * handleLanguageSelect function sets the selected language pair for practice
     *
     * @param {string} lang1 - One of the three available languages (ENG, FIN, SWE)
     * @param {string} lang2 - One of the three available languages (ENG, FIN, SWE)
     */
    function handleLanguageSelect(lang1, lang2) {
        setLanguages({ lang1, lang2 });
        setAskLanguages(false);
        setAskWritingLanguage(true);
    }

    /**
     * handleChoice function sets the language which user wants to write
     *
     * @param {string} language - Language the user chose to write
     */
    function handleChoice(language) {
        setAskWritingLanguage(false);
        setWritingLanguage(language);
    }

    /**
     * handleTagChange function sets the selected tag ID when user picks a tag from the dropdown.
     *
     * @param {number} tagId - The ID of the selected tag.
     */
    const handleTagChange = (tagId) => {
        setSelectedTagId(tagId);
    }

    //Ask user which two languages they'd like to practice
    if (askLanguages) {
        return (
            <div>
                <h2>Which language pair would you like to practice?</h2>
                <div className="lang-select">
                    {/* Buttons for all possible language pairs */}
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

    //Ask user which language of the chosen two languages they'd like to practice
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
                {/* Map all tags to a dropdown menu */}
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

    //If language preferences are set, ask user which practice mode they want
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
                    <button id="play-tag-btn" onClick={() => setAskTag(true)}>
                        Play by tag
                    </button>
                </div>
            </div>
        )
    }
}