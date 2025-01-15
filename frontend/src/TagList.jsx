import axios from "axios";
import './css/TagList.css';
import { useState, useEffect } from "react";
import Tag from "./Tag";

/**
 * TagList component fetches and displays a list of tags.
 * It renders a list of tags with the option to edit each one.
 *
 * @returns A JSX element containing a list of tags, each rendered by the Tag component.
 */
export default function TagList() {

    //State to store fetched tags
    const [tags, setTags] = useState([]);

    useEffect(() => {
        /**
         * fetchItems function fetches the list of tags from the backend API
         */
        const fetchItems = async () => {
            try {
                //Fetch all tags from backend
                const response = await axios.get('http://localhost:3000/api/tags');
                //Store the fetched tags
                setTags(response.data);
            } catch (error) {
                //Log any errors occurring during fetch
                console.error("Error fetching tags: ", error.message);
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
