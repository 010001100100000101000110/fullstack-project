import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Loading from "./Loading";
import "./css/AdminWordPairPage.css"

/**
 * AdminWordPairPage component allows the admin to add or edit a word pair.
 * It provides a component to input the word pair's translations and buttons to save or delete the word pair.
 *
 * @param {string|number} id - The ID of the word pair being edited. If not provided, it's an "Add Word Pair" form.
 * @param {object} existingWordPair - The existing word pair when editing a word pair.
 * @param {func} onSave - The function to call when saving the word pair.
 * @param {func} onDelete - The function to call when deleting the word pair.
 * @returns A JSX element representing the word pair form.
 */
export default function AdminWordPairPage({ id, existingWordPair, onSave, onDelete }) {

    //States for storing the word pair details and selected tags
    const [englishWord, setEnglishWord] = useState(existingWordPair ? existingWordPair.english : "");
    const [finnishWord, setFinnishWord] = useState(existingWordPair ? existingWordPair.finnish : "");
    const [swedishWord, setSwedishWord] = useState(existingWordPair ? existingWordPair.swedish : "");
    const [selectedTags, setSelectedTags] = useState(existingWordPair ? existingWordPair.tags.split(",") : []);

    //State to show an error message when no name is provided
    const [showMessage, setShowMessage] = useState(false);
    //State for storing all tags
    const [tags, setTags] = useState([]);
    //State to track if data is still being fetched
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        /**
         * fetchTags function fetches all tags from the backend API.
         */
        const fetchTags = async () => {
            try {
                //Set loading state to show loading component while data is being fetched
                setIsLoading(true);
                //Fetch tags
                const response = await axios.get("http://localhost:3000/api/tags");
                //Store tags to 'tags'-state
                setTags(response.data);
            } catch (error) {
                //Log any errors occurring during fetch
                console.error("Error fetching tags: ", error.message);
            } finally {
                //Set loading state to hide loading component
                setIsLoading(false);
            }
        };
        fetchTags();
    }, []);

    /**
     * handleSave function saves the word pair to the backend.
     * It sends a PUT request if editing, otherwise sends a POST request to add a new word pair.
     */
    const handleSave = async () => {
        //Check if all input fields are filled
        const validInputs = englishWord && finnishWord && swedishWord;
        if (validInputs) {
            try {
                //Create a new wordpair object
                const wordPair = {
                    english: englishWord,
                    finnish: finnishWord,
                    swedish: swedishWord,
                    tags: selectedTags.toString(),
                };
                //If an ID is provided, update the word pair. Otherwise, create a new word pair
                if (id) {
                    await axios.put(`http://localhost:3000/api/wordpairs/${id}`, wordPair);
                } else {
                    await axios.post("http://localhost:3000/api/wordpairs", wordPair);
                }
                //Call the onSave callback if one is provided
                if (onSave) {
                    onSave();
                }
            } catch (error) {
                //Log any errors occurring during POST or PUT request
                console.error("Error saving word pair: ", error.message);
            }
        } else {
            //Change state to show message telling user to provide content for all text fields
            setShowMessage(true);
            //Hide message after 2,5 seconds
            setTimeout(() => {
                setShowMessage(false)
            }, 2500);
        }
    };

    /**
     * handleCheckboxChange handles the selection and deselection of tags.
     * Stores the selected tags in 'setSelectedTags'-state array.
     *
     * @param {(number|string)} tagId - ID of the tag which's checkbox is being toggled
     */
    const handleCheckboxChange = (tagId) => {
        setSelectedTags((prevSelected) =>
            //Check if previously selected tags contain the currently selected tag
            prevSelected.includes(tagId)
                ? prevSelected.filter((id) => id !== tagId) // If yes, remove the id from the array
                : [...prevSelected, tagId] //If no, add it to the array
        );
    };

    /**
     * handleDelete function calls the onDelete callback if provided, which deletes the existing word pair
     */
    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    };

    //Display loading component when fetching data
    if (isLoading) {
        return <Loading />;
    }

    //Render the word pair page
    return (
        <div className="word-pair-page">
            {/* Determine the title */}
            <h1>{id ? "Edit Word Pair" : "Add Word Pair"}</h1>

            {/* Translation input fields */}
            <div className="inputs">
                <input
                    type="text"
                    maxLength="25"
                    placeholder="English"
                    value={englishWord}
                    onChange={(e) => setEnglishWord(e.target.value)}
                />
                <input
                    type="text"
                    maxLength="25"
                    placeholder="Finnish"
                    value={finnishWord}
                    onChange={(e) => setFinnishWord(e.target.value)}
                />
                <input
                    type="text"
                    maxLength="25"
                    placeholder="Swedish"
                    value={swedishWord}
                    onChange={(e) => setSwedishWord(e.target.value)}
                />
            </div>

            {/* Tag checklist */}
            <h3>Choose tags (optional)</h3>
            <div className="tag-list">
                {tags.map((tag) => (
                    <div key={tag.id} className="tag-list-item">
                        <label>{tag.name}</label>
                        <input
                            type="checkbox"
                            checked={selectedTags.includes(tag.id.toString())}
                            onChange={() => handleCheckboxChange(tag.id.toString())}
                        />
                    </div>
                ))}
            </div>

            {/* Save button */}
            <button className="save-btn" onClick={handleSave}>
                Save
            </button>
            {/* If ID is provided, show delete button */}
            {id && (
                <button className="delete-btn" onClick={handleDelete}>
                    Delete
                </button>
            )}

            {/* Show message if word pair input fields are empty when saving */}
            {showMessage && <p>All language fields are required.</p>}
        </div>
    );
}

//Prop validation for the AdminTagPage component
AdminWordPairPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    existingWordPair: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func
};
