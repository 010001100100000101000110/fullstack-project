import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminWordPairPage from "./AdminWordPairPage";
import Loading from "./Loading";
/**
 * AdminEditWordsPage component fetches the word pair details and allows the admin to edit or delete the word pair.
 * Provides actions to save or delete the word pair.
 *
 * @returns A JSX element representing the page with a word pair editing component, saving or deletion message or a loading component.
 */
export default function AdminEditWordsPage() {
    //Get the word pair ID from the URL parameters
    const { id } = useParams();
    //State to store the fetched word pair object
    const [wordpair, setWordpair] = useState(null);
    //State for tags fetched from backend
    const [tags, setTags] = useState(null);
    //State to track if the word pair is deleted
    const [wordpairDeleted, setWordpairDeleted] = useState(false);
    //State to track if a word pair has been saved
    const [saved, setSaved] = useState(false);
    //State to track if data is still being fetched
    const [isLoading, setIsLoading] = useState(true);

    //When component mounts, fetch word pair details and all tags from backend
    useEffect(() => {
        /**
         * fetchData function fetches the word pair object with given ID and all tags from the backend API.
         */
        const fetchData = async () => {
            try {
                //Set loading state to show loading component while data is being fetched
                setIsLoading(true);
                //Fetch wordpair from backend with ID
                const wordpairResponse = await axios.get(`http://localhost:3000/api/wordpairs/${id}`);
                //Fetch all tags from backend
                const tagsResponse = await axios.get("http://localhost:3000/api/tags");
                //Store fetched word pair
                setWordpair(wordpairResponse.data);
                //Store fetched tags
                setTags(tagsResponse.data);
            } catch (error) {
                //Log any errors occurring during the fetches
                console.error("Error fetching data: ", error.message);
            } finally {
                //Set loading state to hide loading component
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    /**
     * handleSave function is triggered when a word pair is saved. Shows a brief "Word pair saved!"-message
     */
    const handleSave = () => {
        //Set saved state to show "Word pair saved!"-message
        setSaved(true);
        //Reset wordpair state
        setWordpair("");
        //setTimeout, so user can briefly see "Tag saved!" message
        setTimeout(() => {
            window.location.href = "/admin";
        }, 1000);
        //Another setTimeout to switch saving status later while page redirects
        setTimeout(() => {
            setSaved(false);
        }, 5000);
    };

    /**
    * handleDelete function deletes the word pair and redirects to the admin page after deletion.
    */
    const handleDelete = async () => {
        try {
            //Set wordpairDeleted state to show deletion status to user
            setWordpairDeleted(true);
            //DELETE request to remove the word pair
            await axios.delete(`http://localhost:3000/api/wordpairs/${id}`);
            //setTimeout, so user can briefly see "Word pair deleted." message
            setTimeout(() => {
                //Redirect to admin page after deletion
                window.location.replace("/admin");
            }, 1000);
            //Another setTimeout to switch deletion status later while page redirects
            setTimeout(() => {
                setWordpairDeleted(true);
            }, 5000);
        } catch (error) {
            //Log any errors occurring during deletion
            console.error("Error deleting word pair: ", error.message);
        }
    };

    //Show loading page if data is still being fetched
    if (isLoading) {
        return <Loading />;
    }
    //Show saving message if word pair has been saved
    if (saved) {
        return <h2>Word pair saved!</h2>;
    }
    //Show deletion message if word pair has been deleted
    if (wordpairDeleted) {
        return <p>Word pair deleted.</p>;
    }

    //Render the word pair editing page
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