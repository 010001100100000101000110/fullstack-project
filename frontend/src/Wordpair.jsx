import './css/Wordpair.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import axios from "axios";
/**
 * Wordpair component displays a single word pair, showing the English, Finnish, and Swedish translations.
 * It also displays the tags associated with the word pair and provides an option to edit the word pair.
 *
 * @param {Object} pair - The word pair object containing details about the word pair.
 * @returns JSX element representing a single word pair with translation and associated tags.
 */
export default function Wordpair({pair}) {
    //State to hold the word pair's tags
    const [tags, setTags] = useState(null);

    //When the component is mounted, fetch the word pair's tags
    useEffect(() => {
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
                    console.error("Error fetching tag: ", error);
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

    return (
        <div className="wordpair">
            <p className="english-word">{pair.english}</p>
            <p className="finnish-word">{pair.finnish}</p>
            <p className="swedish-word">{pair.swedish}</p>
            <p className="wordpair-tag">{tags ? tags : "No tags"}</p>
            <button className="edit-word-btn" onClick={handleEditClick}>
                Edit
            </button>
        </div>
    )
}

Wordpair.propTypes = {
    pair: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        english: PropTypes.string.isRequired,
        finnish: PropTypes.string.isRequired,
        swedish: PropTypes.string.isRequired,
        tags: PropTypes.string
    }).isRequired
};