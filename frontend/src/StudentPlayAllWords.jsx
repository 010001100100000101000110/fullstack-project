import './css/StudentPlayAllWords.css'
import { useState, useEffect } from "react";
import axios from "axios";
import StudentScorePage from './StudentScorePage';

/**
* Practice mode where the user plays all words without filtering.
* User can pick 2 out of 3 languages and which one of them they want to practice writing.
*/
export default function StudentPlayAllWords() {

    //all existing words in database
    const [wordpairs, setWordpairs] = useState([]);
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
    //boolean determining, if user is displayed a choice of language pairs(eng-fin, eng-swe, fin-swe)
    const [askLanguages, setAskLanguages] = useState(true);
    //boolean determining, if user is displayed a choice of which of the chosen languages do they want to practice writing
    const [askWritingLanguage, setAskWritingLanguage] = useState(false);
    //holds the two languages the user picks
    const [languages, setLanguages] = useState({lang1: "english", lang2: "finnish"});
    //the language the user wants to write
    const [writingLanguage, setWritingLanguage] = useState("finnish");
    //user's score. Goes up by 1 when answering correctly
    const [score, setScore] = useState(0);

    useEffect(() => {
        if(!gameOver) {
            const fetchItems = async () => {
                const apiUrl = 'http://localhost:3000/api/wordpairs';
                try {
                    const response = await axios.get(apiUrl);
                    setWordpairs(response.data);
                    getRandomPair(response.data);

                } catch (error) {
                    console.error("Error fetching wordpairs: ", error);
                }
            };
            fetchItems();
        }

    }, [gameOver]);

    /**
    * Picks a new random wordpair to display. This ensures that each playthrough is different
    * @param array wordpairs array
    */
    function getRandomPair(array) {
        if (array.length === 0) return;
        const randNum = Math.floor(Math.random() * array.length);
        console.log(randNum);
        setCurrentWordpair(array[randNum]);
        console.log("CURRENT WORDPAIR: ", currentWordpair);
        setWordpairs((prev) =>
            prev.filter((_,index) => index !== randNum)
        );
    }

    /**
    * Function executed when user submits an answer.
    * logs the given word, written word, and if the answer was correct or not.
    */
    function handleAnswer() {
        if(!currentWordpair) return;
        //compare if answer is correct
        const isCorrect =
            (writingLanguage === "finnish" && answer === currentWordpair.finnish) ||
            (writingLanguage === "english" && answer === currentWordpair.english) ||
            (writingLanguage === "swedish" && answer === currentWordpair.swedish);
        //add score(or don't)
        setScore((prev) => (isCorrect ? prev + 1 : prev));
        //set an answer
        setAnswers((prev) => [
            ...prev,
            {
                q: getWord(),
                a: answer,
                correct: isCorrect}
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

    //**
    //
    //
    // */
    function handleLanguageSelect(lang1, lang2){
        setLanguages({lang1, lang2});
        setAskLanguages(false);
        setAskWritingLanguage(true);
    }

    if (askLanguages) {
        return (
            <div>
                <h2>I want to practice...</h2>
                <div id="lang-select">
                    <button onClick={() => handleLanguageSelect("english", "swedish")}>
                        English - Swedish
                    </button>
                    <button onClick={() => handleLanguageSelect("english", "finnish")}>
                        English - Finnish
                    </button>
                    <button onClick={() => handleLanguageSelect("finnish", "swedish")}>
                        Finnish - Swedish
                    </button>
                </div>

            </div>
        )
    }
    //**
    //
    //
    // */
    function handleChoice(language) {
        setAskWritingLanguage(false);
        setWritingLanguage(language);
    }
    if (askWritingLanguage) {
        return (
            <div>
                <h2>Which language do you want to practice writing?</h2>
                <button onClick={() => handleChoice(languages.lang1)}>{languages.lang1}</button>
                <button onClick={() => handleChoice(languages.lang2)}>{languages.lang2}</button>
            </div>
        )
    }
    //show loading text if a wordpair hasn't been fetched yet
    if(!currentWordpair) {
        return <p>Loading...</p>;
    }

    const resetPage = () => {
        setAskLanguages(true);
        setGameOver(false);
        setScore(0);
        setCurrentWordpair(null);
        setAnswer("");
        setShowAnswerMessage(false);
        setAnswers([]);
        setWritingLanguage("");
        setGameOver(false);
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
                {getWord()}
            </p>
            <input
                type="text"
                placeholder={`in ${writingLanguage}`}
                onChange={(event) => setAnswer(event.target.value)}
            />
            <button onClick={handleAnswer}>Confirm</button>
            {showAnswerMessage && <p>answered</p>}

        </div>
    )

    function getWord() {
        if (writingLanguage === languages.lang1) {
            return currentWordpair[languages.lang2];
        }
        return currentWordpair[languages.lang1];
    }
}