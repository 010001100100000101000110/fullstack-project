//page which allows the admin to edit wordpairs
import './css/FrontPage.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


export default function AdminEditWordsPage() {
    const { id } = useParams();
    const [wordpair, setWordpair] = useState(null);
    const [englishWord, setEnglishWord] = useState("");
    const [finnishWord, setFinnishWord] = useState("");

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

    const handleClick = async () => {
        try {
            const apiUrl = `/api/wordpairs/${id}`;
            const wordpair = { english: englishWord, finnish: finnishWord }
            await axios.put(apiUrl, wordpair);
        } catch (error) {
            console.error("Error inserting data: ", error);
        }
    }

    if(!wordpair) {
        return <h2>Loading...</h2>
    }

    const handleDelete = async () => {
        try {
            const apiUrl = `http://localhost:3000/api/wordpairs/${id}`;
            await axios.delete(apiUrl);
        } catch (error) {
            console.error(error);
        }
    }

    return (
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
                onClick={handleClick}
            >
                Save
            </button>

            <Link to="/admin">
                <button id="choose-student-btn">
                    Go back
                </button>
            </Link>

            <button onClick={handleDelete}>delete</button>

        </div>
    )
}