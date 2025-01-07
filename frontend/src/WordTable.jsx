//shows a table of wordpairs

import axios from "axios";
import './css/WordPair.css';
import Wordpair from './Wordpair';
import { useState, useEffect } from "react";

export default function WordTable() {
    const [wordpairs, setWordpairs] = useState([]);

    useEffect(() => {
        console.log("USE EFFECT");
        const fetchItems = async () => {
            console.log("FETCH");
            const apiUrl = ' http://localhost:3000/api/wordpairs';
            try {
                const response = await axios.get(apiUrl);
                console.info(response.data);
                setWordpairs(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
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
