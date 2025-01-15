//page which allows the admin to edit wordpairs
import './css/AdminEditWordsPage.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function AdminEditWordsPage() {
    //Get the word pair's ID from URL parameters
    const { id } = useParams();
    //State to hold the word pair object
    const [wordpair, setWordpair] = useState(null);
    //States for managing word pair properties
    const [englishWord, setEnglishWord] = useState("");
    const [finnishWord, setFinnishWord] = useState("");
    const [swedishWord, setSwedishWord] = useState("");
    //State for tags fetched from backend
    const [allTags, setAllTags] = useState("");
    const [oldTags, setOldTags] = useState("");
    const [wordpairDeleted, setWordpairDeleted] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    //Selected tags for the word pair
    const [selectedTags, setSelectedTags] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchWordpair = async () => {
            try {
                // Fetch the correct word pair by id
                const words = await axios.get(`http://localhost:3000/api/wordpairs/${id}`);
                // Fetch the list of tags from the backend API
                const tags = await axios.get(`http://localhost:3000/api/tags`);

                setWordpair(words.data);
                setEnglishWord(words.data.english);
                setFinnishWord(words.data.finnish);
                setSwedishWord(words.data.swedish);

                //Store the fetched tags
                setAllTags(tags.data);


                if (words.data.tags) {
                    setOldTags(words.data.tags);
                    setSelectedTags(words.data.tags.split(','));
                }
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
        //check if all language inputs are filled
        const validInputs = englishWord && swedishWord && finnishWord;
        if (validInputs) {
            try {
                const wordpair = {
                    english: englishWord,
                    finnish: finnishWord,
                    swedish: swedishWord,
                    tags: selectedTags.toString()
                }
                console.log(wordpair);
                await axios.put(`http://localhost:3000/api/wordpairs/${id}`, wordpair);
                setSaved(true)
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1000);
                setTimeout(() => {
                    setSaved(false);
                }, 5000);
            } catch (error) {
                console.error("Error inserting data: ", error);
            }
        } else {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }

    }


    /**
    * handleCheckboxChange handles the selection and deselection of tags
    * by updating the selectedTags state array.
    */
    const handleCheckboxChange = (tagId) => {
        console.log(selectedTags);
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tagId.toString()) ?
                prevSelected.filter((id) => id !== tagId.toString())
                : [...prevSelected, tagId.toString()]
        );
    };


    const handleDelete = async () => {
        try {
            setWordpairDeleted(true);
            await axios.delete(`http://localhost:3000/api/wordpairs/${id}`);
            setTimeout(() => {
                setWordpairDeleted(false);
                window.location.replace('/admin')
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    }
    if (saved) {
        return (
            <h2>Word pair saved!</h2>
        )
    }

    if (wordpairDeleted) {
        return (
            <p>Wordpair deleted.</p>
        )
    }
    if (!wordpair) {
        return <Loading />
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
                {/* Tag selection section */}
                <h3>Choose tags (optional)</h3>
                <div>
                    {/* Display checkboxes for all available tags */}
                    {allTags.map((tag, index) => (
                        <div key={index}>
                            {tag.name}
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(tag.id)}
                                defaultChecked={oldTags.includes(tag.id)}
                            />
                        </div>
                    ))}
                </div>
                {/* Button to save the updated word pair to the database */}
                <button
                    className="save-words-btn"
                    onClick={handleSave}
                >
                    Save
                </button>

                <button className="delete-btn" onClick={handleDelete}></button>

                {/* Show message when attempting to save empty fields */}
                {showMessage && <p>All language fields are required</p>}
            </div>
        </div>
    )
}