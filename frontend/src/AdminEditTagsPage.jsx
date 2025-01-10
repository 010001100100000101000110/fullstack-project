//page which allows the admin to edit wordpairs
import './css/AdminEditWordsPage.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


//**
//
//
//
// */
export default function AdminEditWordsPage() {
    const { id } = useParams();
    const [wordpair, setWordpair] = useState(null);
    const [englishWord, setEnglishWord] = useState("");
    const [finnishWord, setFinnishWord] = useState("");
    const [swedishWord, setSwedishWord] = useState("");
    const [wordsDeleted, setWordsDeleted] = useState(false);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWordpair = async () => {
            try {
                const apiUrl = `http://localhost:3000/api/wordpairs/${id}`;
                const response = await axios.get(apiUrl);
                setWordpair(response.data);
                setEnglishWord(response.data.english);
                setFinnishWord(response.data.finnish);
                setSwedishWord(response.data.swedish);
            } catch (error) {
                console.error("Error getting data: ", error);
            }
        }
        fetchWordpair();
    }, [id]);

    //**
    //
    // */
    const handleSave = async () => {
        try {
            setShowSaveMessage(true);
            const apiUrl = `http://localhost:3000/api/wordpairs/${id}`;
            const wordpair = { english: englishWord, finnish: finnishWord, swedish: swedishWord }
            const response = await axios.put(apiUrl, wordpair);
            setTimeout(() => {
                console.log("RESPONSE: ", response);
                setShowSaveMessage(false);
            }, 3000);
        } catch (error) {
            console.error("Error inserting data: ", error);
        }
    }

    if (!wordpair) {
        return <h2>Loading...</h2>
    }

    //**
    //
    // */
    const handleDelete = async () => {
        try {
            setWordsDeleted(true);
            const apiUrl = `http://localhost:3000/api/wordpairs/${id}`;
            const response = await axios.delete(apiUrl);
            setTimeout(() => {
                console.log("RESPONSE: ", response);
                setWordsDeleted(false);
                navigate('/admin', { replace: true });
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    }

    if (wordsDeleted) {
        return (
            <p>Wordpair deleted.</p>
        )
    }
    return (
        <div>
            <div>
                <p>{wordpair.id}</p>
                <h1>Edit word pair</h1>

                <input
                    type="text"
                    placeholder="English"
                    defaultValue={wordpair.english}
                    onChange={(event) => setEnglishWord(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Finnish"
                    defaultValue={wordpair.finnish}
                    onChange={(event) => setFinnishWord(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Swedish"
                    defaultValue={wordpair.swedish}
                    onChange={(event) => setSwedishWord(event.target.value)}
                />

                <button
                    className="save-words-btn"
                    onClick={handleSave}
                >
                    Save
                </button>

                <Link to="/admin">
                    <button id="choose-student-btn">
                        Go back
                    </button>
                </Link>

                <button className="delete-btn" onClick={handleDelete}></button>

                {showSaveMessage && <p>Wordpair saved!</p>}
            </div>
        </div>
    )
}