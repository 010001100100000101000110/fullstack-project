import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import AdminTagPage from './AdminTagPage';

/**
 * AdminEditTagsPage component fetches the tag details and allows the admin to edit or delete the tag.
 * Provides actions to save or delete the tag.
 *
 * @returns A JSX element representing the page with a word pair editing component, saving or deletion message or a loading component.
 */
export default function AdminEditTagsPage() {

    //Get the tag ID from the URL parameters
    const { id } = useParams();
    //State to store the fetched tag object
    const [tag, setTag] = useState(null);
    //State to track if the tag is deleted
    const [tagDeleted, setTagDeleted] = useState(false);
    //State to track if a tag has been saved
    const [saved, setSaved] = useState(false);
    //State to track if data is still being fetched
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        /**
         * fetchTag function fetches tag from the backend API based on the tag ID.
         */
        const fetchTag = async () => {
            try {
                //Set loading state to show loading component while data is being fetched
                setIsLoading(true);
                //Fetch tag by given ID
                const response = await axios.get(`http://localhost:3000/api/tags/${id}`);
                //Store fetched tag to 'tag'-state
                setTag(response.data);
            } catch (error) {
                //Log any errors occurring during fetch
                console.error("Error fetching tag data: ", error.message);
            } finally {
                //Set loading state to hide loading component
                setIsLoading(false);
            }
        };
        fetchTag();
    }, [id]);

    /**
     * handleSave function is triggered when a tag is saved. Shows a brief "Tag saved!" message
     */
    const handleSave = () => {
        setSaved(true);
        setTag("");
        //setTimeout, so user can briefly see "Tag saved!" message
        setTimeout(() => {
            //Redirect to admin page after saving the tag
            window.location.href = "/admin";
        }, 1500);
        //Another setTimeout to switch saving status later while page redirects
        setTimeout(() => {
            setSaved(false);
        }, 4000);
    };

    /**
     * handleDelete function deletes the tag and redirects to the admin page after deletion.
     */
    const handleDelete = async () => {
        try {
            //Set tagDeleted state to show deletion status to user
            setTagDeleted(true);
            //DELETE request to remove the tag
            await axios.delete(`http://localhost:3000/api/tags/${id}`);
            //setTimeout, so user can briefly see "Tag deleted." message
            setTimeout(() => {
                //Redirect to admin page after deletion
                window.location.replace("/admin");
            }, 1000);
            //Another setTimeout to switch deletion status later while page redirects
            setTimeout(() => {
                setTagDeleted(false);
            }, 4000);
        } catch (error) {
            //Log any errors occurring during deletion
            console.error("Error deleting tag: ", error.message);
        }
    }

    //Show loading page if data is still being fetched
    if (isLoading) {
        return <Loading />;
    }

    //Show deletion message if tag has been deleted
    if (tagDeleted) {
        return <p>Tag deleted.</p>;
    }
    //Show saving message if tag has been saved
    if (saved) {
        return <h2>Tag saved!</h2>
    }

    //Render the tag editing page
    return <AdminTagPage
        id={tag.id}
        existingTagName={tag.name}
        onSave={handleSave}
        onDelete={handleDelete}
    />;
}