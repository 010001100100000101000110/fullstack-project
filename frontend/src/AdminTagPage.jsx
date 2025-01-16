import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import "./css/AdminTagPage.css"


/**
 * AdminTagPage component allows the admin to add or edit a tag.
 * It provides a component to input the tag name and buttons to save or delete the tag.
 *
 * @param {(string|number)} id - The ID of the tag being edited. If not provided, it's an "Add Tag" form.
 * @param {string} existingTagName - The existing tag name when editing a tag.
 * @param {Function} onSave - The function to call when saving the tag.
 * @param {Function} onDelete - The function to call when deleting the tag.
 * @returns A JSX element representing a page to add or edit a tag.
 */
export default function AdminTagPage({ id, existingTagName, onSave, onDelete }) {

    //State for the tag name input
    const [tagName, setTagName] = useState(existingTagName || "");
    //State to show an error message when no name is provided
    const [showMessage, setShowMessage] = useState(false);

    /**
     * handleSave function saves the tag to the backend.
     * It sends a PUT request if editing, otherwise sends a POST request to add a new tag.
     */
    const handleSave = async () => {
        //Check if the name input field has content
        if (tagName) {
            try {
                //If an ID is provided, update the tag. Otherwise, create a new tag
                if (id) {
                    await axios.put(`http://localhost:3000/api/tags/${id}`, {name: tagName});
                } else {
                    await axios.post("http://localhost:3000/api/tags/", { name: tagName });
                }
                //Reset the tag name after saving
                setTagName("");
                //Call the onSave callback if one is provided
                if (onSave) {
                    onSave();
                }
            } catch (error) {
                //Log any errors occurring during POST or PUT request
                console.error("Error saving tag: ", error.message);
            }
        } else {
            //Change state to show message telling user to provide a name for the tag
            setShowMessage(true);
            //Hide message after 2,5 seconds
            setTimeout(() => {
                setShowMessage(false);
            }, 2500);
        }
    };

    /**
     * handleDelete function deletes the existing tag and calls the onDelete callback if provided.
     */
    const handleDelete = () => {
        //Call the onDelete callback if one is provided
        if (onDelete) {
            onDelete();
        }
    };

    //Render the tag page
    return (
        <div className="tag-page">
            {/* Determine the title */}
            <h1>{id ? "Edit Tag" : "Add Tag"}</h1>

            {/* Tag name input field */}
            <input
                className="tag-name-input"
                type="text"
                maxLength="15"
                placeholder="Tag name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
            />

            <div className="tag-page-btns">
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
            </div>
            {/* Show message if tag name input field is empty when saving */}
            {showMessage && <p>Tag name required.</p>}
        </div>
    );
}

//Prop validation for the AdminTagPage component
AdminTagPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    existingTagName: PropTypes.string,
    onSave: PropTypes.func,
    onDelete: PropTypes.func
};