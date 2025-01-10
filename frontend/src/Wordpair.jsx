//visual element which shows wordpair and handles deletion of said pair

import './css/Wordpair.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import axios from "axios";
/**
 *
 * @returns
 */
export default function Wordpair({pair}) {
    const [tags, setTags] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            if (!pair.tags) return;

            const tagArray = pair.tags.split(',');
            console.log("TAGARRAY SPLIT: ", tagArray);

            let tagNameArray = [];
            for (let i = 0; i < tagArray.length; i++) {
                try {
                    const apiUrl = `http://localhost:3000/api/tags/${tagArray[i]}`;
                    const response = await axios.get(apiUrl);
                    tagNameArray.push(response.data.name);
                } catch (error) {
                    console.error("Error fetching tag: ", error);
                }
            }
            try {
                const apiUrl = `http://localhost:3000/api/tags`;
                const response = await axios.get(apiUrl);
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags: ", error);
            }
            setTags(tagNameArray.join(", "));
        }
        fetchTags();
    }, [pair.tags]);

    const url = `/admin/edit-words/${pair.id}`;
    const handleClick = async () => {
        window.location.href = url;
    }

    return (
        <div className="wordpair">
            <p>{pair.id}</p>
            <p className="english-word">EN: {pair.english}</p>
            <p className="finnish-word">FI: {pair.finnish}</p>
            <p className="swedish-word">SW: {pair.swedish}</p>
            <p className="wordpair-tag">Tags: {tags}</p>
            <button className="edit-word-btn" onClick={handleClick}>
                Edit
            </button>
        </div>
    )
}

Wordpair.propTypes = {
    pair: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]). isRequired,
        english: PropTypes.string.isRequired,
        finnish: PropTypes.string.isRequired,
        swedish: PropTypes.string.isRequired,
        tags: PropTypes.string
    }).isRequired
};