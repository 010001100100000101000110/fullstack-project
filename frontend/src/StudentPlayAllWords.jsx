import './css/StudentPlayAllWords.css'
import { useState, useEffect } from "react";
import axios from "axios";
import StudentQuiz from './StudentQuiz';
import Loading from "./Loading";

/**
 * StudentPlayAllWords component fetches all word pairs from backend
 * and renders the StudentQuiz component to present all word pairs for user to practice.
 * The alternative to StudentPlayFilteredWords.
 *
 * @returns A JSX element representing a page where the user is able to practice all words that is rendered by the StudentQuiz component
 */
export default function StudentPlayAllWords() {

    //State to store the fetched word pairs from backend
    const [wordpairs, setWordpairs] = useState([]);
    //State to track if data is still being fetched
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        /**
         * fetchItems function fetches all word pairs from the backend API
         */
        const fetchItems = async () => {
            try {
                //Set loading state to show loading component while data is being fetched
                setIsLoading(true);
                //GET request to backend to fetch all word pairs
                const response = await axios.get('http://localhost:3000/api/wordpairs');
                //Store the fetched word pairs
                setWordpairs(response.data);
            } catch (error) {
                //Log any errors that occur during the fetch
                console.error("Error fetching wordpairs: ", error.message);
            } finally {
                //Set loading state to hide loading component
                setIsLoading(false);
            }
        };
        fetchItems();
    }, []);

    //Render the loading component during data fetch
    if (isLoading) {
        return <Loading />;
    }

    //Render the quiz component to present fetched word pairs to user
    return <StudentQuiz wordlist={wordpairs} />
}