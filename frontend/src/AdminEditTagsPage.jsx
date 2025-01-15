import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import AdminTagPage from './AdminTagPage';

export default function AdminEditTagsPage() {
    const { id } = useParams();
    const [tag, setTag] = useState(null);
    const [tagDeleted, setTagDeleted] = useState(false);
    useEffect(() => {
        const fetchTag = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tags/${id}`);
                setTag(response.data);
            } catch (error) {
                console.error("Error fetching tag data: ", error);
            }
        };
        fetchTag();
    }, [id]);

    const handleSave = () => {
        setTag("");
        setTimeout(() => {
            window.location.href = "/admin";
        }, 1000);
    };

    const handleDelete = async () => {
        try {
            setTagDeleted(true);
            await axios.delete(`http://localhost:3000/api/tags/${id}`);
            setTimeout(() => {
                window.location.replace("/admin");
            }, 1000);
            setTimeout(() => {
                setTagDeleted(false);
            }, 5000);
        } catch (error) {
            console.error(error);
        }
    }

    if (!tag) {
        return <Loading />;
    }

    return (
        <div>
            {tagDeleted ? (
                <p>Tag deleted.</p>
            ) : (
                <AdminTagPage
                    id={tag.id}
                    existingTagName={tag.name}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}