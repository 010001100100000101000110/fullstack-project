import './css/StudentScorePage.css';
import PropTypes from 'prop-types';

/**
 * StudentScorePage component displays the user's score and the results of their answers.
 *
 * @param {Array} answers - An array of answer objects containing the question, answer, the correct answer and correctness.
 * @param {number} score - The score the user received.
 * @param {func} resetFunc - A function to reset the quiz state.
 * @returns JSX element displaying the results and score of the practice instance.
 */
export default function StudentScorePage({answers, score, resetFunc}) {

    /**
     * handleRetry function is called when user exits the score page
     */
    const handleRetry = () => {
        answers = null;
        score = null;
        resetFunc();
    }
    //Render the score page
    return (
        <div id="score-page">
            <h1>Your score:</h1>
            <ul className="scoretable">
                {/* Headers for the score grid */}
                <div className='header'>
                    <p>Q</p>
                    <p>Given word</p>
                    <p>Your answer</p>
                    <p>Points</p>
                </div>
                {/* Map the answers into rows in the grid */}
                {answers.map((answer, i) => (
                    <div key={i} className='row'>
                        <p>{i + 1}</p>
                        <p>{answer.q}</p>
                        <p>
                            {!answer.correct &&
                                <span style={{ textDecoration: 'line-through' }}>
                                    {answer.a}
                                </span>
                            }
                            {` ${answer.correctA}`}
                        </p>
                        <p className={answer.correct  ? "ans-correct" : "ans-incorrect"}>{answer.correct ? "1" : "0"}</p>
                    </div>
                ))}
            </ul>
            <h2 id="final-score">{score}/{answers.length}</h2>

            <button onClick={handleRetry}>Back to language selection</button>
        </div>
    )
}
//Prop validation for the StudentScorePage component
StudentScorePage.propTypes = {
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            a: PropTypes.string.isRequired,
            q: PropTypes.string.isRequired,
            correct: PropTypes.bool.isRequired,
        })
    ).isRequired,
    score: PropTypes.number.isRequired,
    resetFunc: PropTypes.func.isRequired,
};