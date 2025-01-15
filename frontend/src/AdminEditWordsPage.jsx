import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminWordPairPage from "./AdminWordPairPage";
import Loading from "./Loading";

export default function AdminEditWordsPage() {
    //Get the id of the word pair from url parameters
    const { id } = useParams();
    //State to store the word pair object
    const [wordpair, setWordpair] = useState(null);
    //State for tags fetched from backend
    const [tags, setTags] = useState(null);
    //State for boolean verifying if the word pair was deleted or not
    const [wordpairDeleted, setWordpairDeleted] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const wordpairResponse = await axios.get(`http://localhost:3000/api/wordpairs/${id}`);
                const tagsResponse = await axios.get("http://localhost:3000/api/tags");
                setWordpair(wordpairResponse.data);
                setTags(tagsResponse.data);
            } catch (error) {
                console.error("Error fetching data: ", error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSave = () => {
        setSaved(true);
        setWordpair("");
        setTimeout(() => {
            window.location.href = "/admin";
        }, 1000);
        setTimeout(() => {
            setSaved(false);
        }, 5000);
    };

    const handleDelete = async () => {
        setWordpairDeleted(true);
        try {
            await axios.delete(`http://localhost:3000/api/wordpairs/${id}`);
            setTimeout(() => {
                window.location.replace("/admin");
            }, 1000);
            setTimeout(() => {
                setWordpairDeleted(true);
            }, 5000);
        } catch (error) {
            console.error("Error deleting word pair: ", error.message);
        }
    };

    if (isLoading) {
        return <Loading />;
    }
    if (saved) {
        return <h2>Word pair saved!</h2>;
    }
    if (wordpairDeleted) {
        return <p>Word pair deleted.</p>;
    }
    return (
        <AdminWordPairPage
            id={wordpair.id}
            existingWordPair={wordpair}
            tags={tags}
            onSave={handleSave}
            onDelete={handleDelete}
        />
    );
}