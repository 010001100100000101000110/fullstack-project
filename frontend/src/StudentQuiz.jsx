import './css/StudentQuiz.css'
import { useState, useEffect } from "react";
import StudentScorePage from './StudentScorePage';
import PropTypes from 'prop-types';
import Loading from "./Loading";
/**
* StudentQuiz component renders a practicing page and lets the user practice word pairs from a given array.
* Used by StudentPlayAllWords and StudentPlayFilteredWords components.
*
* @param {Array} wordlist - The list of words the user will practice. Contains either all or filtered word pairs.
* @returns A JSX element representing the practicing page.
*/
export default function StudentQuiz({ wordlist }) {
    //State to store the word pair array from props
    const [wordpairs, setWordpairs] = useState([wordlist]);
    //State to store a randomly picked word pair
    const [currentWordpair, setCurrentWordpair] = useState(null);
    //State to store user's answer input
    const [answer, setAnswer] = useState("");
    //State to show a message when an answer is submitted
    const [showAnswerMessage, setShowAnswerMessage] = useState(false);
    //State to store user's answers
    const [answers, setAnswers] = useState([]);
    //State to track if practicing is complete
    const [gameOver, setGameOver] = useState(false);
    //State to store user's score
    const [score, setScore] = useState(0);
    //State to store user's preferences
    const [preferences, setPreferences] = useState(null);
    //State to track if data is still being fetched
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        try {
            //Set loading state to show loading component
            setIsLoading(true);
            //Get user's preferences from local storage
            const storedPreference = localStorage.getItem('preferences');
            if (storedPreference) {
                //Store the preferences to a state
                setPreferences(JSON.parse(storedPreference));
            }
            //Store the array of given word pairs
            setWordpairs(wordlist);
            //Get the first word pair to practice
            getRandomPair(wordlist);
        } catch (error) {
            //Log any errors
            console.error("error getting preferences: ", error.message);
        } finally {
            //Set loading state to hide loading component
            setIsLoading(false);
        }
    }, []);

    if (isLoading || !currentWordpair) {
        return <Loading />;
    }

    /**
    * getRandomPair function picks a new random wordpair from an array
    * ensuring each go-through's uniqueness.
    *
    * @param {array} array - Array of word pairs to pick a pair from.
    */
    function getRandomPair(array) {
        //Exit earlt if given array is empty
        if (array.length === 0) return;
        //Get random index
        const randNum = Math.floor(Math.random() * array.length);
        //Define the currently practiced word pair with random index
        setCurrentWordpair(array[randNum]);
        //Remove used word pair from array
        setWordpairs((prev) =>
            prev.filter((_, index) => index !== randNum)
        );
    }

    /**
    * handleAnswer function is executed when user submits an answer.
    * Stores an answer object consistuing of
    * the given word, written word, the correct answer and the correctness of the answer to an array.
    */
    function handleAnswer() {
        //Exit early if the answer field is empty
        if (!answer) return;
        //Compare correctness
        const isCorrect =
            (preferences.writingLanguage === "finnish" && answer === currentWordpair.finnish) ||
            (preferences.writingLanguage === "english" && answer === currentWordpair.english) ||
            (preferences.writingLanguage === "swedish" && answer === currentWordpair.swedish);
        //Update score if needed
        setScore((prev) => (isCorrect ? prev + 1 : prev));
        //Inser the answer object to the answers state array
        setAnswers((prev) => [
            ...prev,
            {
                q: getPromptWord(),
                a: answer,
                correctA: getCorrectAnswer(),
                correct: isCorrect
            }
        ]);

        if (wordpairs.length === 0) {
            //End practice if word array is empty
            setGameOver(true);
        } else {
            //Get new word pair to present user
            getRandomPair(wordpairs);
        }
        //Empty the answer field
        setAnswer("");
        //Show message confirming submission
        setShowAnswerMessage(true);
        //Hide message after 2 seconds
        setTimeout(() => {
            setShowAnswerMessage(false);
        }, 2000);
    }

    /**
     * getPromptWord function determines which of the current word pair's words the user was asked to translate.
     * Used when user submits an answer and stores it in an answer object.
     * Shown on the score page.
     *
     * @returns {string} - The word which the user was asked to translate.
     */
    function getPromptWord() {
        if (preferences.writingLanguage === preferences.languages.lang1) {
            return currentWordpair[preferences.languages.lang2];
        }
        return currentWordpair[preferences.languages.lang1];
    }

    /**
     * getCorrectAnswer function determines which of the current word pair's words is the correct answer.
     * Used when user submits an answer and stores it in an answer object.
     * Shown on the score page when user's answer is incorrect.
     *
     * @returns {string} - The word which is the correct translation to the word presented to user.
     */
    function getCorrectAnswer() {
        if (preferences.writingLanguage === preferences.languages.lang1) {
            return currentWordpair[preferences.languages.lang1];
        }
        return currentWordpair[preferences.languages.lang2];
    }

    /**
     * resetPage function resets the quiz's properties for the next practicing try
     * and redirects the user back to the student's main page.
     */
    const resetPage = () => {
        setScore(0);
        setCurrentWordpair(null);
        setAnswer("");
        setShowAnswerMessage(false);
        setAnswers([]);
        setGameOver(false);
        localStorage.setItem('preferences', null);
        window.location.href = '/student';
    }



    //Render the score page component after practice is over
    if (gameOver) {
        return (
            <div className='score-page'>
                <StudentScorePage answers={answers} score={score} resetFunc={resetPage} />
            </div>
        )
    }

    return (
        <div className="quiz-page">
            <h1>Write the correct word!</h1>
            {/* Get the word to translate */}
            <h3>
                {getPromptWord()}
            </h3>
            {/* Answer input field */}
            <input
                type="text"
                placeholder={`in ${preferences.writingLanguage}`}
                onChange={(event) => setAnswer(event.target.value)}
                value={answer}
            />
            {/* Answer submission */}
            <button onClick={handleAnswer}>Confirm</button>
            {/* Message shown when answer is submitted */}
            {showAnswerMessage && <p>answer submitted</p>}
        </div>
    )
}

//Prop validation for the StudentQuiz component
StudentQuiz.propTypes = {
    wordlist: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        english: PropTypes.string.isRequired,
        finnish: PropTypes.string.isRequired,
        swedish: PropTypes.string.isRequired,
        tags: PropTypes.string
        })
    ).isRequired
};