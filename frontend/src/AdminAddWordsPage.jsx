import './css/AdminAddWordsPage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


/**
 * page which allows the admin to add words to database
 * @returns
 */
export default function AdminAddWordsPage() {

    const [englishWord, setEnglishWord] = useState("");
    const [finnishWord, setFinnishWord] = useState("");
    const [swedishWord, setSwedishWord] = useState("");
    const [tags, setTags] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [selectedTags, setSelectedTags] = useState("");

    useEffect(() => {
        const fetchTags= async () => {
            try {
                const apiUrl = `http://localhost:3000/api/tags`;
                const response = await axios.get(apiUrl);
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags: ", error);
            }
        }
        fetchTags();
    }, []);

    /**
     *
     */
    const handleSave = async () => {
        setShowMessage(true);
        try {
            const apiUrl = 'http://localhost:3000/api/wordpairs';
            console.log("TAGS: ", tags, "SELECTED TAGs STRING: ", selectedTags.toString());
            const wordpair = { english: englishWord, finnish: finnishWord , swedish: swedishWord, tags: selectedTags.toString()}
            console.log("WORDPAIR!! ", wordpair);
            const response = await axios.post(apiUrl, wordpair);
            console.info(response.data);
            setSelectedTags([]);
        } catch (error) {
            console.error("Error saving wordpair: ", error);
        }
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    }

    if(!tags) return <p>Loading...</p>

    const handleCheckboxChange = (tagId) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tagId) ?
                prevSelected.filter((id) => id !== tagId)
                : [...prevSelected, tagId]
        );
        console.log("SELECTED TAGS!!!::  ", selectedTags);
    };



    return (
        <div id="add-words-page">
            <h1>Add word pair</h1>
            <p>note: all language fields are required</p>
            <div className="inputs">
                <input
                    className='text-input'
                    type="text"
                    placeholder="English"
                    onChange={(event) => setEnglishWord(event.target.value)}
                />
                <input
                    className='text-input'
                    type="text"
                    placeholder="Finnish"
                    onChange={(event) => setFinnishWord(event.target.value)}
                />
                <input
                    className='text-input'
                    type="text"
                    placeholder="Swedish"
                    onChange={(event) => setSwedishWord(event.target.value)}
                />
            </div>

            <h2>Tags:</h2>
            <ul className='no-bullets'>
                {tags.map((tag, index) => (
                    <li key={index}>
                        {tag.name}
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(tag.id)}
                            checked={selectedTags.includes(tag.id)}
                        />
                    </li>
                ))}
            </ul>
            <button
                id="add-to-database-btn"
                onClick={handleSave}
            >
                Add to database
            </button>

            <Link to="/admin">
                <button id="choose-student-btn">
                    Go back
                </button>
            </Link>

            <p>{showMessage && "Wordpair added to database!"}</p>
        </div>
    )
}
