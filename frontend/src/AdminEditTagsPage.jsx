//page which allows the admin to edit tags
import './css/AdminEditWordsPage.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


export default function AdminEditWordsPage() {
    const { id } = useParams();
    const [tag, setTag] = useState(null);
    const [newTagName, setNewTagName] = useState(null);
    const [tagDeleted, setTagDeleted] = useState(false);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTag = async () => {
            try {
                const apiUrl = `http://localhost:3000/api/tags/${id}`;
                const response = await axios.get(apiUrl);
                console.log(response);
                console.log(response.data);
                setTag(response.data);
                setNewTagName(response.data.name);
            } catch (error) {
                console.error("Error getting data: ", error);
            }
        }
        fetchTag();
    }, [id]);

    //**
    //
    // */
    const handleSave = async () => {
        try {
            console.log("ID: ", id, "TAG: ", tag)
            setShowSaveMessage(true);
            const apiUrl = `http://localhost:3000/api/tags/${id}`;
            const response = await axios.put(apiUrl, {name: newTagName});
            setTimeout(() => {
                console.log("RESPONSE: ", response);
                setShowSaveMessage(false);
            }, 3000);
        } catch (error) {
            console.error("Error inserting data: ", error);
        }
    }

    if (!tag) {
        return <h2>Loading...</h2>
    }

    //**
    //
    // */
    const handleDelete = async () => {
        try {
            setTagDeleted(true);
            const apiUrl = `http://localhost:3000/api/tags/${id}`;
            const response = await axios.delete(apiUrl);
            setTimeout(() => {
                console.log("RESPONSE: ", response);
                setTagDeleted(false);
                navigate('/admin', { replace: true });
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    }

    if (tagDeleted) {
        return (
            <p>Wordpair deleted.</p>
        )
    }
    return (
        <div>
            <div>
                <p>{tag.id}</p>
                <h1>Edit tag</h1>

                <input
                    type="text"
                    placeholder="Tag name"
                    defaultValue={tag.name}
                    onChange={(event) => setNewTagName(event.target.value)}
                />

                <button
                    className="save-tag-btn"
                    onClick={handleSave}
                >
                    Save
                </button>

                <Link to="/admin">
                    <button>
                        Go back
                    </button>
                </Link>

                <button className="delete-btn" onClick={handleDelete}></button>

                {showSaveMessage && <p>Tag saved!</p>}
            </div>
        </div>
    )
}