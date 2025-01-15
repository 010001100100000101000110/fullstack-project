import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import Loading from "./Loading";
import "./css/AdminWordPairPage.css"
/**
 *
 * @param {string|number} id
 * @param {object} existingWordPair
 * @param {func} onSave
 * @param {func} onDelete
 * @returns
 */
export default function AdminWordPairPage({ id, existingWordPair, onSave, onDelete }) {
    //set values based on if the component is used to edit an existing word pair or adding a new one
    const [englishWord, setEnglishWord] = useState(existingWordPair ? existingWordPair.english : "");
    const [finnishWord, setFinnishWord] = useState(existingWordPair ? existingWordPair.finnish : "");
    const [swedishWord, setSwedishWord] = useState(existingWordPair ? existingWordPair.swedish : "");
    const [selectedTags, setSelectedTags] = useState(existingWordPair ? existingWordPair.tags.split(",") : []);
    const [showMessage, setShowMessage] = useState(false);
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("http://localhost:3000/api/tags");
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTags();
    }, []);

    // Save the word pair
    const handleSave = async () => {
        const validInputs = englishWord && finnishWord && swedishWord;
        if (validInputs) {
            const wordPair = {
                english: englishWord,
                finnish: finnishWord,
                swedish: swedishWord,
                tags: selectedTags.toString(),
            };

            if (id) {
                await axios.put(`http://localhost:3000/api/wordpairs/${id}`, wordPair);
            } else {
                await axios.post("http://localhost:3000/api/wordpairs", wordPair);
            }
            onSave();
        } else {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false)
            }, 2500);
        }
    };

    // Handle tag selection/deselection
    const handleCheckboxChange = (tagId) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tagId)
                ? prevSelected.filter((id) => id !== tagId)
                : [...prevSelected, tagId]
        );
    };

    // Handle delete action
    const handleDelete = () => {
        if (onDelete) {
            onDelete(); // Call the parent-provided delete function
        }
    };

    //Display loading component when fetching data
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="word-pair-page">
            <h1>{id ? "Edit Word Pair" : "Add Word Pair"}</h1>

            <div className="inputs">
                <input
                    type="text"
                    placeholder="English"
                    value={englishWord}
                    onChange={(e) => setEnglishWord(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Finnish"
                    value={finnishWord}
                    onChange={(e) => setFinnishWord(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Swedish"
                    value={swedishWord}
                    onChange={(e) => setSwedishWord(e.target.value)}
                />
            </div>

            <h3>Choose tags (optional)</h3>
            <div className="tag-list">
                {tags.map((tag) => (
                    <div key={tag.id} className="tag-list-item">
                        <label>{tag.name}</label>
                        <input
                            type="checkbox"
                            checked={selectedTags.includes(tag.id.toString())}
                            onChange={() => handleCheckboxChange(tag.id.toString())}
                        />
                    </div>
                ))}
            </div>

            <button className="save-btn" onClick={handleSave}>
                Save
            </button>

            {id && (
                <button className="delete-btn" onClick={handleDelete}>
                    Delete
                </button>
            )}

            {showMessage && <p>All language fields are required</p>}
        </div>
    );
}

AdminWordPairPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    existingWordPair: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func
};
