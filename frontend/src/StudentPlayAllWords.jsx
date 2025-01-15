import './css/StudentPlayAllWords.css'
import { useState, useEffect } from "react";
import axios from "axios";
import StudentQuiz from './StudentQuiz';
import Loading from "./Loading";
/**
* Practice mode where the user plays all words without filtering.
* User can pick 2 out of 3 languages and which one of them they want to practice writing.
*/
export default function StudentPlayAllWords() {

    //all existing words in database
    const [wordpairs, setWordpairs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            }
        };
        fetchItems();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return <StudentQuiz wordlist={wordpairs} />

}