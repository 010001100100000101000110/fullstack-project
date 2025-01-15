import './css/BackButton.css';
import { useLocation } from 'react-router-dom';

export default function BackButton() {
    const location = useLocation();
    const disableButton =
        location.pathname === '/'
        || location.pathname === '/admin'
        || location.pathname === '/student'
        || location.pathname === '/student/play-all'
        || location.pathname === '/student/play-filtered';
    const handleBackClick = () => {
        window.history.back();
    };

    return (
        <div className="back-button">
            {!disableButton &&
            <button onClick={handleBackClick}>
                {"<"}
            </button>
            }
        </div>
    );
}