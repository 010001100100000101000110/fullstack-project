import { useState } from "react";
import './css/AdminAddWordsPage.css';
import axios from "axios";
/**
 * page which allows the admin to add words to database
 */
export default function AdminAddTagsPage() {
    const [tag, setTag] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleSave = async () => {

        try {
            const apiUrl = 'http://localhost:3000/api/tags';
            const newTag = { name: tag };

            const response = await axios.post(apiUrl, newTag);
            console.info(response.data);
            setShowMessage(true);
        } catch (error) {
            console.error("Error inserting data: ", error);
        }
        setTimeout(() => {
            setShowMessage(false);
            setTag("");
        }, 3000);
    }
    return (
        <div className="add-tag-view">
            <h1>Add Tag</h1>
            <h2>Tag Name:</h2>
            <input
                type="text"
                placeholder="tag name"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
            />
            <button onClick={handleSave}>save tag</button>
            {showMessage && <p>Tag {tag} saved!</p>}
        </div>
    )
}