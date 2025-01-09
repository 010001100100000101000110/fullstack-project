import './css/StudentScorePage.css';


export default function StudentScorePage({answers, score, resetFunc}) {

    const handleRetry = () => {
        answers = null;
        score = null;
        resetFunc();
    }
    return (
        <div id="score-page">
            <h1>Your score:</h1>
            <ul className="scoretable">

                <div className='header'>
                    <p>n</p>
                    <p>Given word</p>
                    <p>Your answer</p>
                    <p>Points</p>
                </div>

                {answers.map((answer, i) => (
                    <div key={i} className='row'>
                        <p>{i + 1}</p>
                        <p>{answer.q}</p>
                        <p>{answer.a}</p>
                        <p className={answer.correct ? "ans-correct" : "ans-incorrect"}>{answer.correct ? "1" : "0"}</p>
                    </div>
                ))}
            </ul>
            <h2 id="final-score">{score}/{answers.length}</h2>

            <button onClick={handleRetry}>To language selection!</button>
        </div>
    )
}