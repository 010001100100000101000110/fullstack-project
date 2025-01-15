import './css/AdminAddWordsPage.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from './Loading';
/**
 * AdminAddTWordsPage component allows the admin to add new word pairs to the database.
 * @returns JSX element representing the admin's adding tags page.
 */
export default function AdminAddWordsPage() {

    //States for managing input fields
    const [englishWord, setEnglishWord] = useState("");
    const [finnishWord, setFinnishWord] = useState("");
    const [swedishWord, setSwedishWord] = useState("");
    //State for tags fetched from backend
    const [tags, setTags] = useState(null);
    //State to control the visibility of a success message after saving the word pair
    const [showMessage, setShowMessage] = useState(false);
    //Selected tags for the word pair
    const [selectedTags, setSelectedTags] = useState("");
    const [saved, setSaved] = useState(false);
    /**
     * When the component is mounted,
     * it fetches the available tags from the backend API.
     */
    useEffect(() => {
        const fetchTags= async () => {
            try {
                // Fetch the list of tags from the backend API
                const response = await axios.get(`http://localhost:3000/api/tags`);
                //Store the fetched tags
                setTags(response.data);
            } catch (error) {
                //Log any errors that occur during the fetch
                console.error("Error fetching words: ", error);
            }
        }
        //Call the function to get tags
        fetchTags();
    }, []);

    /**
    * handleSave function handles the process of saving the new word pair to the database.
    * It sends a POST request to the API with the new word pair data, and displays a message verifying the word pair was saved.
    */
    const handleSave = async () => {
        //check if all language inputs are filled
        const validInputs = englishWord && swedishWord && finnishWord;
        if (validInputs) {
            try {
                //New word pair object
                const wordpair = {
                    english: englishWord,
                    finnish: finnishWord,
                    swedish: swedishWord,
                    tags: selectedTags.toString()
                };
                //Send POST request to the server
                await axios.post('http://localhost:3000/api/wordpairs', wordpair);
                //Set all input fields to empty
                setSelectedTags([]);
                setEnglishWord("");
                setFinnishWord("");
                setSwedishWord("");
                //Show the success message after saving the word pair
                setSaved(true);
                //Hide the success message after 3 seconds
                setTimeout(() => {
                    setSaved(false)
                }, 4000);
            } catch (error) {
                //Log any errors that occur during the insert
                console.error("Error saving wordpair: ", error);
            }
        } else {
            setShowMessage(true);
            //Hide the message after 3 seconds
            setTimeout(() => {
                setShowMessage(false);
            }, 4000);
        }
    }



    /**
     * handleCheckboxChange handles the selection and deselection of tags
     * by updating the selectedTags state array.
     */
    const handleCheckboxChange = (tagId) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tagId) ?
                prevSelected.filter((id) => id !== tagId)
                : [...prevSelected, tagId]
        );
    };

    // Show loading component, if tags are still being fetched
    if (!tags) return <Loading />

    if (saved) {
        return (
            <h2>Word pair saved!</h2>
        )
    }

    return (
        <div id="add-words-page">

            <h1>Add word pair</h1>
            <p>note: all language fields are required</p>
            {/* Input fields for English, Finnish, and Swedish words */}
            <div className="inputs">
                <input
                    className='text-input'
                    type="text"
                    placeholder="English"
                    value = {englishWord}
                    onChange={(event) => setEnglishWord(event.target.value)}
                />
                <input
                    className='text-input'
                    type="text"
                    placeholder="Finnish"
                    value={finnishWord}
                    onChange={(event) => setFinnishWord(event.target.value)}
                />
                <input
                    className='text-input'
                    type="text"
                    placeholder="Swedish"
                    value={swedishWord}
                    onChange={(event) => setSwedishWord(event.target.value)}
                />
            </div>

            {/* Tag selection section */}
            <h3>Choose tags (optional)</h3>
            <div>
                {/* Display checkboxes for all available tags */}
                {tags.map((tag, index) => (
                    <div key={index}>
                        {tag.name}
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(tag.id)}
                            checked={selectedTags.includes(tag.id)}
                        />
                    </div>
                ))}
            </div>
            {/* Button to save the new word pair to the database */}
            <button
                id="add-to-database-btn"
                onClick={handleSave}>
                Add to database
            </button>
            {/* Show message when attempting to save empty fields */}
            {showMessage && <p>All language fields are required</p>}
        </div>
    )
}
