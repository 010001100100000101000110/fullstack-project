import './css/Wordpair.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Wordpair component displays a single word pair with translations in English, Finnish, and Swedish.
 * It also shows the associated tags and an editing button that redirects to an edit page
 *
 * @param {Object} pair - The word pair object containing details of the word pair.
 * @returns A JSX Component containing the word pair details and an edit button.
 */
export default function Wordpair({pair}) {
    //State to hold the word pair's tags
    const [tags, setTags] = useState(null);

    useEffect(() => {
        /**
         * fetchTags function fetches the tags associated with the word pair by its tag IDs.
         */
        const fetchTags = async () => {
            //Exit the hook if the word pair has no tags
            if (!pair.tags) return;
            //Split the word pair's string of tag IDs into an array
            const tagArray = pair.tags.split(',');
            //Array to hold the tags' names
            let tagNameArray = [];
            //Loop through the tag IDs to get the tags from the tag API
            for (let i = 0; i < tagArray.length; i++) {
                try {
                    //GET request to fetch a tag by ID
                    const response = await axios.get(`http://localhost:3000/api/tags/${tagArray[i]}`);
                    //Push the fetched tag's name to the tag name array
                    tagNameArray.push(response.data.name);
                } catch (error) {
                    //Log any errors that occur during tag fetch
                    console.error("Error fetching tag: ", error.message);
                }
            }
            //Set the tags
            setTags(tagNameArray.join(", "));
        }
        //Call function to fetch tags by id
        fetchTags();
    }, [pair]);

    //The handleEditClick function redirects to an editing URL defined by the word pair's ID
    const handleEditClick = async () => {
        window.location.href = `/admin/edit-words/${pair.id}`;
    }

    //Render the word pair object
    return (
        <div className="wordpair">
            <p className="english-word">{pair.english}</p>
            <p className="finnish-word">{pair.finnish}</p>
            <p className="swedish-word">{pair.swedish}</p>
            <p className="wordpair-tag">{tags ? tags : "No tags"}</p>
            <button className="edit-btn" onClick={handleEditClick}>
                Edit
            </button>
        </div>
    )
}

//Prop validation for the Wordpair component
Wordpair.propTypes = {
    pair: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        english: PropTypes.string.isRequired,
        finnish: PropTypes.string.isRequired,
        swedish: PropTypes.string.isRequired,
        tags: PropTypes.string
    }).isRequired
};