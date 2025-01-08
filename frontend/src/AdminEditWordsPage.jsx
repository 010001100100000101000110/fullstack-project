//page which allows the admin to edit wordpairs
import './css/FrontPage.css';
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
                // setEnglishWord(wordpair.english);
                // setFinnishWord(wordpair.finnish);
                // console.info(wordpair.data);
            } catch (error) {
                console.error("Error getting data: ", error);
            }
        }
        fetchWordpair();
    },[id]);

    //**
    //
    // */
    const handleSave = async () => {
        try {

            setShowSaveMessage(true);
            const apiUrl = `http://localhost:3000/api/wordpairs/${id}`;
            const wordpair = { english: englishWord, finnish: finnishWord }
            const response = await axios.put(apiUrl, wordpair);
            setTimeout(() => {
                console.log("RESPONSE: ", response);
                setShowSaveMessage(false);
            }, 3000);
        } catch (error) {
            console.error("Error inserting data: ", error);
        }
    }

    if(!wordpair) {
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

                <button onClick={handleDelete}>delete</button>

                {showSaveMessage && <p>Wordpair saved!</p>}
            </div>
        </div>
    )
}