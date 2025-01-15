import axios from "axios";
import './css/WordTable.css';
import Wordpair from './Wordpair';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * WordTable component fetches and displays a table of word pairs.
 * It has columns for English, Finnish, Swedish words, tags and an edit button.
 *
 * @returns A JSX element containing a table of word pairs that are rendered by the Wordpair component.
 */
export default function WordTable() {

    //State to store the fetched word pairs
    const [wordpairs, setWordpairs] = useState([]);
    //Hook to track location to re-fetch data on location change
    const location = useLocation();

    useEffect(() => {
        /**
         * fetchItems function fetches all word pairs from the backend API.
         */
        const fetchItems = async () => {
            try {
                //GET request to backend to fetch all word pairs
                const response = await axios.get('http://localhost:3000/api/wordpairs');
                //Store the fetched word pairs
                setWordpairs(response.data);
            } catch (error) {
                //Log any errors that occur during the fetch
                console.error("Error fetching wordpairs: ", error.message);
            }
        };
        //Call the function to fetch the word pairs when component mounts or location changes
        fetchItems();
    },[location]);

    //Render the word table consisting of multiple Wordpair components
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
