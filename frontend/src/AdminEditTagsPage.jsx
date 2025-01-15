import './css/AdminEditWordsPage.css';
import { useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function AdminEditWordsPage() {
    const { id } = useParams();
    const [tag, setTag] = useState(null);
    const [newTagName, setNewTagName] = useState(null);
    const [tagDeleted, setTagDeleted] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const [saved, setSaved] = useState(false);
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


    const handleSave = async () => {
        if (tag) {
            try {
                console.log("ID: ", id, "TAG: ", tag)

                const apiUrl = `http://localhost:3000/api/tags/${id}`;
                await axios.put(apiUrl, { name: newTagName });

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
    if (!tag) {
        return <Loading />
    }


    const handleDelete = async () => {
        try {
            setTagDeleted(true);
            const apiUrl = `http://localhost:3000/api/tags/${id}`;
            await axios.delete(apiUrl);
            setTimeout(() => {
                setTagDeleted(false);
                window.location.replace('/admin');
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

                <button className="delete-btn" onClick={handleDelete}></button>

                {showMessage && <p>Tag name required.</p>}
            </div>
        </div>
    )
}