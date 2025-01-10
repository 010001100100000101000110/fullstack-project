import axios from "axios";
import './css/TagList.css';
import { useState, useEffect } from "react";

/**
 * shows a table of wordpairs
 */
export default function TagList() {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const apiUrl = ' http://localhost:3000/api/tags';
            try {
                const response = await axios.get(apiUrl);
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags: ", error);
            }
        };
        fetchItems();
    }, []);

    return (
        <ul className="taglist">
            {tags.map((tag) => (
                <li key={tag.id}> {tag.name} </li>
            ))}
        </ul>
    )
}
