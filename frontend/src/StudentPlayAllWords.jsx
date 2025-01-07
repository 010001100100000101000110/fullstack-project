//page where the user plays all words without filtering
import './css/StudentPlayAllWords.css'
import { useState, useEffect } from "react";
import axios from "axios";

export default function StudentPlayAllWords() {

    const [wordpairs, setWordpairs] = useState([]);
    const [currentWordpair, setCurrentWordpair] = useState(null);
    const [answer, setAnswer] = useState("");

    const [message, setMessage] = useState("You got it!");
    const [showMessage, setShowMessage] = useState(false);

    const [answers, setAnswers] = useState([]);
    const [gamePlayed, setGamePlayed] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            const apiUrl = 'http://localhost:3000/api/wordpairs';
            try {
                const response = await axios.get(apiUrl);
                setWordpairs(response.data);
                getRandomPair(response.data);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchItems();
    }, []);

    function getRandomPair(array) {
        if (array.length === 0) return;
        const randNum = Math.floor(Math.random() * (array.length + 1));
        console.log(randNum);
        const selectedPair = array[randNum];
        setCurrentWordpair(selectedPair);
        console.log("CURRENT WORDPAIR: ", currentWordpair);
        setWordpairs((prevWordpairs) =>
            prevWordpairs.filter((_,index) => index !== randNum)
        );
    }

    function handleAnswer() {
        setShowMessage(true);
        console.log("CURRENT WORDPAIR: ", currentWordpair);
        if(answer !== currentWordpair.finnish) {
            console.log("TÄÄLLÄ",answer, currentWordpair.finnish);
            setMessage("You suck fr!");

        } else {
            console.log("OIKEIN MENI");
            setMessage("Nicely done!");

        }

        setAnswers((prevAnswers) => [...prevAnswers, { q: currentWordpair.english, a: answer, correct: answer === currentWordpair.finnish ? "Correct!:)" : "Incorrect!:("}]);
        console.log("ANSWERS: ", answers);
        if (wordpairs.length === 1) {
            setGamePlayed(true);
        } else {
            getRandomPair(wordpairs);

        }
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
        console.log("CURRENT WORDPAIR: ", currentWordpair);
    }

    return (
        <div>
            {!gamePlayed &&
            <div>
            <h1>Fill in the words!</h1>

            <p>{currentWordpair && currentWordpair.english}</p>
            <input
                type="text"
                placeholder="in finnish"
                onChange={(event) => setAnswer(event.target.value)}
            />

            <button
            onClick={handleAnswer}>
                Confirm
            </button>

            <p>{showMessage && message}</p>
            </div>}

            {gamePlayed &&
            <div>
                <h1>Your score:</h1>
                <ul className="scoretable">
                    {answers.map((answer, i) => (
                        <li key={i}> q: {answer.q} a: {answer.a} {answer.correct}</li>
                    ))}
                </ul>
            </div>}

        </div>
    )
}