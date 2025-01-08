//page where the user plays all words without filtering
import './css/StudentPlayAllWords.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

//**
//
//
// */
export default function StudentPlayAllWords() {

    const [wordpairs, setWordpairs] = useState([]);
    const [currentWordpair, setCurrentWordpair] = useState(null);
    const [answer, setAnswer] = useState("");

    const [message, setMessage] = useState("You got it!");
    const [showMessage, setShowMessage] = useState(false);

    const [answers, setAnswers] = useState([]);
    const [gamePlayed, setGamePlayed] = useState(false);

    const [showQuestion, setShowQuestion] = useState(true);

    const [language, setLanguage] = useState("finnish");

    const [score, setScore] = useState(0);
    const [questionAmount, setQuestionAmount] = useState(0);

    const setFinnish = () => {
        setShowQuestion(false);
        setLanguage("finnish");
    }
    const setEnglish = () => {
        setShowQuestion(false);
        setLanguage("english");
    }
    useEffect(() => {
        const fetchItems = async () => {
            const apiUrl = 'http://localhost:3000/api/wordpairs';
            try {
                const response = await axios.get(apiUrl);
                setWordpairs(response.data);
                console.log("LENGTH ", response.data.length);
                setQuestionAmount(response.data.length);
                getRandomPair(response.data);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchItems();
    }, []);

    //**
    //
    //
    // */
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

    //**
    //
    //
    // */
    function handleAnswer() {
        if(!currentWordpair) return;

        const isCorrect =
            (language === "finnish" && answer === currentWordpair.finnish) ||
            (language === "english" && answer === currentWordpair.english);

        setMessage(isCorrect ? "Nicely done!" : "You suck fr!");
        setScore((prev) => (isCorrect ? prev + 1 : prev));
        setAnswers((prev) => [
            ...prev,
            {
                q: language === "finnish" ? currentWordpair.english : currentWordpair.finnish,
                a: answer,
                correct: isCorrect ? "Correct!:)" : "Incorrect!:(" }]);

        if (wordpairs.length === 0) {
            setGamePlayed(true);
        } else {
            getRandomPair(wordpairs);

        }
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
        console.log("CURRENT WORDPAIR: ", currentWordpair);
    }

    //show score after playthrough
    if (gamePlayed) {
        return (
            <div>
                <h1>Your score:</h1>
                <ul className="scoretable">
                    {answers.map((answer, i) => (
                        <li key={i}> q: {answer.q} a: {answer.a} {answer.correct}</li>
                    ))}
                </ul>
                <p>{score}/{questionAmount}</p>
            </div>
        )
    }

    if(!currentWordpair) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {!showQuestion &&
                <div>
                    <h1>Write the correct word!</h1>
                    <p>{language === "finnish" ? currentWordpair.english : currentWordpair.finnish}</p>
                    <input
                        type="text"
                        placeholder={`in ${language}`}
                        onChange={(event) => setAnswer(event.target.value)}
                    />
                    <button onClick={handleAnswer}>Confirm</button>
                    {showMessage && <p>{message}</p>}
                </div>
            }

            {showQuestion &&
                <div>
                    <h2>which language do you want to practice writing?</h2>

                    <Link to="/student/play-all/english">
                        <button onClick={setEnglish}>English</button>
                    </Link>
                    <Link to="/student/play-all/finnish">
                        <button onClick={setFinnish}>Finnish</button>
                    </Link>
                </div>
            }
        </div>
    )
}