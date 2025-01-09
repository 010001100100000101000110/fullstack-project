//page which allows the admin to add words to database
import './css/AdminAddWordsPage.css';
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";


//**
//
//
//
// */
export default function AdminAddWordsPage() {

    const [englishWord, setEnglishWord] = useState("");
    const [finnishWord, setFinnishWord] = useState("");
    const [swedishWord, setSwedishWord] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    //**
    //
    //
    // */
    const handleSave = async () => {
        setShowMessage(true);
        try {
            const apiUrl = 'http://localhost:3000/api/wordpairs';
            const wordpair = { english: englishWord, finnish: finnishWord , swedish: swedishWord}

            const response = await axios.post(apiUrl, wordpair);
            console.info(response.data);
        } catch (error) {
            console.error("Error inserting data: ", error);
        }
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    }

    return (
        <div>
            <h1>Add word pair</h1>

            <input
                type="text"
                placeholder="English"
                onChange={(event) => setEnglishWord(event.target.value)}
            />
            <input
                type="text"
                placeholder="Finnish"
                onChange={(event) => setFinnishWord(event.target.value)}
            />
            <input
                type="text"
                placeholder="Swedish"
                onChange={(event) => setSwedishWord(event.target.value)}
            />

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