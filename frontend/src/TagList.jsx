import axios from "axios";
import './css/TagList.css';
import { useState, useEffect } from "react";
import Tag from "./Tag";
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
        <div className="taglist">
            <h3>Name</h3>
            <h3></h3>
            {tags.map((tag) => (
                <Tag key={tag.id} tag={tag} />
            ))}
        </div>
    )
}
