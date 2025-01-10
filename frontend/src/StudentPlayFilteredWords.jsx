import './css/StudentPlayAllWords.css'
import { useState, useEffect } from "react";
import axios from "axios";
import StudentQuiz from './StudentQuiz';
/**
* Practice mode where the user plays all words without filtering.
* User can pick 2 out of 3 languages and which one of them they want to practice writing.
*/
export default function StudentPlayFilteredWords() {

    const [wordpairs, setWordpairs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //WORK IN PROCESS!! Currently doesnt filter at all
    useEffect(() => {
        const fetchItems = async () => {
            const apiUrl = 'http://localhost:3000/api/wordpairs';
            try {
                console.log("HGELÖÖ");
                const response = await axios.get(apiUrl);

                setWordpairs(response.data);

            } catch (error) {
                console.error("Error fetching wordpairs: ", error);
            } finally {
                console.log("HGELÖÖ");
                setIsLoading(false);
            }
        };
        fetchItems();

    }, []);

    if(isLoading) {
        return <p>Loading words...</p>;
    }

    return <StudentQuiz wordlist={wordpairs} />
}