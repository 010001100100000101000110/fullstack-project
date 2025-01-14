import './css/StudentPlayAllWords.css'
import { useState, useEffect } from "react";
import StudentScorePage from './StudentScorePage';
import PropTypes from 'prop-types';
/**
* Practice mode
* @param wordlist the list of words the user will practice. Could either be all words from database or words filtered by tag
*/
export default function StudentQuiz({ wordlist }) {
    //all existing words in database
    const [wordpairs, setWordpairs] = useState([wordlist]);
    //current selected wordpair the user has to answer
    const [currentWordpair, setCurrentWordpair] = useState(null);
    //string of what user writes to the answer field
    const [answer, setAnswer] = useState("");
    //boolean determining, if a brief message will be shown to user. Goes on true when answer is submitted
    const [showAnswerMessage, setShowAnswerMessage] = useState(false);
    //array of user's answers. Gets used when game is over and score is displayed
    const [answers, setAnswers] = useState([]);

    //boolean to know if game is over.
    const [gameOver, setGameOver] = useState(false);

    //user's score. Goes up by 1 when answering correctly
    const [score, setScore] = useState(0);

    const [preferences, setPreferences] = useState(null);

    const [isLoading, setIsLoading] = useState(true);


    //fetch preferences
    useEffect(() => {
        try {
            const storedPreference = localStorage.getItem('preferences');
            if (storedPreference) {
                setPreferences(JSON.parse(storedPreference));
                console.log("PREFERENCES: ", JSON.parse(storedPreference))
            }
            setWordpairs(wordlist);
            console.log("WORDLIST", wordlist);
            getRandomPair(wordlist);
        } catch (err) {
            console.error("error getting preferences: ", err);
        } finally {
            setIsLoading(false);
        }

    }, []);
    if (isLoading || !currentWordpair) {
        return <p>Loading...</p>;
    }


    /**
    * Picks a new random wordpair to display. This ensures that each playthrough is different
    * @param array wordpairs array
    */
    function getRandomPair(array) {
        console.log("GETTING RANDOM PAIR");
        if (array.length === 0) return;
        const randNum = Math.floor(Math.random() * array.length);
        console.log(randNum);
        setCurrentWordpair(array[randNum]);
        console.log("CURRENT WORDPAIR: ", currentWordpair);
        setWordpairs((prev) =>
            prev.filter((_, index) => index !== randNum)
        );
    }

    /**
    * Function executed when user submits an answer.
    * Logs the given word, written word, and if the answer was correct or not.
    */
    function handleAnswer() {
        if (!currentWordpair) return;
        //compare if answer is correct
        const isCorrect =
            (preferences.writingLanguage === "finnish" && answer === currentWordpair.finnish) ||
            (preferences.writingLanguage === "english" && answer === currentWordpair.english) ||
            (preferences.writingLanguage === "swedish" && answer === currentWordpair.swedish);
        //add score(or don't)
        setScore((prev) => (isCorrect ? prev + 1 : prev));
        //set an answer
        setAnswers((prev) => [
            ...prev,
            {
                q: getPromptWord(),
                a: answer,
                correct: isCorrect
            }
        ]);

        if (wordpairs.length === 0) {
            setGameOver(true);
        } else {
            getRandomPair(wordpairs);
        }
        setShowAnswerMessage(true);
        setTimeout(() => {
            setShowAnswerMessage(false);
        }, 2000);
    }

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
    /**
     *
     * @returns the word which was the player was asked to translate
     */
    function getPromptWord() {
        if (preferences.writingLanguage === preferences.languages.lang1) {
            return currentWordpair[preferences.languages.lang2];
        }
        return currentWordpair[preferences.languages.lang1];
    }

    //show score after playthrough
    if (gameOver) {
        return (
            <div className='score-page'>
                <StudentScorePage answers={answers} score={score} resetFunc={resetPage} />
            </div>
        )
    }

    return (
        <div>
            <h1>Write the correct word!</h1>
            <p>
                {getPromptWord()}
            </p>
            <input
                type="text"
                placeholder={`in ${preferences.writingLanguage}`}
                onChange={(event) => setAnswer(event.target.value)}
            />
            <button onClick={handleAnswer}>Confirm</button>
            {showAnswerMessage && <p>answered</p>}

        </div>
    )


}

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