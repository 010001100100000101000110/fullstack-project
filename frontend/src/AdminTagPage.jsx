import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import "./css/AdminTagPage.css"

export default function AdminTagPage({ id, existingTagName, onSave, onDelete }) {
    const [tagName, setTagName] = useState(existingTagName || "");
    const [showMessage, setShowMessage] = useState(false);

    const handleSave = async () => {
        if (tagName) {
            try {
                if (id) {
                    await axios.put(`http://localhost:3000/api/tags/${id}`, {name: tagName});
                } else {
                    await axios.post("http://localhost:3000/api/tags/", { name: tagName });
                }

                setTagName("");
                if (onSave) {
                    onSave();
                }
            } catch (error) {
                console.error("Error saving tag: ", error.message);
            }
        } else {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    };

    return (
        <div className="tag-page">
            <h1>{id ? "Edit Tag" : "Add Tag"}</h1>
            <input
                className="tag-name-input"
                type="text"
                placeholder="Tag name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
            />
            <div className="tag-page-btns">
            <button className="save-btn" onClick={handleSave}>
                Save
            </button>
            {id && (
                <button className="delete-btn" onClick={handleDelete}>
                    Delete
                </button>
            )}
            </div>
            {showMessage && <p>Tag name required.</p>}

        </div>
    );
}

AdminTagPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    existingTagName: PropTypes.string,
    onSave: PropTypes.func,
    onDelete: PropTypes.func
};