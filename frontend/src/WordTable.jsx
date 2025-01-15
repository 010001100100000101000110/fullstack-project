import axios from "axios";
import './css/WordTable.css';
import Wordpair from './Wordpair';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
/**
 * WordTable component fetches and displays a list of word pairs from the backend API.
 * It shows a table with columns for English, Finnish, Swedish words, tags and an edit button.
 *
 * @returns JSX element representing a table of word pairs.
 */
export default function WordTable() {
    //State for fetched word pairs from backend
    const [wordpairs, setWordpairs] = useState([]);
    const location = useLocation();
    //When component is mounted, fetch all word pairs from backend API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                //GET request to backend to fetch all word pairs
                const response = await axios.get('http://localhost:3000/api/wordpairs');
                //Store the fetched word pairs
                setWordpairs(response.data);
            } catch (error) {
                //Log any errors that occur during the fetch
                console.error("Error fetching wordpairs: ", error);
            }
        };
        //Call the function to get the word pairs
        fetchItems();
    },[location]);

    return (
        <div className="wordtable">
            {/* Headers for the word pair grid */}
            <div>
                <h3>English</h3>
                <h3>Finnish</h3>
                <h3>Swedish</h3>
                <h3>Tags</h3>
                {/* Empty column for the edit buttons */}
                <h3></h3>
            </div>
            <div id="wordpairs">
                {/* Map and render all fetched word pairs using the Wordpair component */}
                {wordpairs.map((pair) => (
                    <Wordpair key={pair.id} pair={pair} />
                ))}
            </div>
        </div>
    )
}
