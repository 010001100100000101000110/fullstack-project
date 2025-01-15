import { useState } from "react";
import './css/AdminAddWordsPage.css';
import axios from "axios";
/**
 * AdminAddTagsPage component allows the admin to add new tags to the database.
 * @returns JSX element representing the admin's adding tags page.
 */
export default function AdminAddTagsPage() {
    //State to manage the tag name input
    const [tag, setTag] = useState("");
    //State to control the visibility of a success message after saving the tag
    const [showMessage, setShowMessage] = useState(false);
    const [saved, setSaved] = useState(false);
    /**
    * handleSave function handles the process of saving the new tag to the database.
    * It sends a POST request to the API with the new tag data, and displays a message verifying the tag was saved.
    */
    const handleSave = async () => {
        if(tag) {
            try {
                //New tag object
                const newTag = { name: tag };
                //Send POST request to the server
                await axios.post('http://localhost:3000/api/tags', newTag);
                setTag("");
                setSaved(true);
                setTimeout(() => {
                    setSaved(false);
                }, 3000);
            } catch (error) {
                //Log any errors that occur during the fetch
                console.error("Error inserting data: ", error);
            }
        } else {
            setShowMessage(true);
            //Hide the success message after 3 seconds
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }

    }
    if (saved) {
        return (
            <h2>Tag saved!</h2>
        )
    }
    return (
        <div className="add-tag-view">
            <h1>Add Tag</h1>
            <h2>Enter tag name:</h2>

            {/* Input field for the admin to enter a tag name */}
            <input
                type="text"
                placeholder="tag name"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
            />

            {/* Button to save the entered tag */}
            <button onClick={handleSave}>Save</button>

            {/* Show message when trying to save an empty tag */}
            {showMessage && <p>Tag name required.</p>}
        </div>
    )
}