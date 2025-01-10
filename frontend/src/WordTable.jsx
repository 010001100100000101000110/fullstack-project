import axios from "axios";
import './css/WordTable.css';
import Wordpair from './Wordpair';
import { useState, useEffect } from "react";

/**
 * shows a table of wordpairs
 */
export default function WordTable() {
    const [wordpairs, setWordpairs] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const apiUrl = 'http://localhost:3000/api/wordpairs';
            try {
                const response = await axios.get(apiUrl);
                setWordpairs(response.data);
            } catch (error) {
                console.error("Error fetching wordpairs: ", error);
            }
        };
        fetchItems();
    },[]);

    return (
        <ul className="wordtable">
            {wordpairs.map((pair) => (
                <li key={pair.id}> <Wordpair pair={pair} /> </li>
            ))}
        </ul>
    )
}
