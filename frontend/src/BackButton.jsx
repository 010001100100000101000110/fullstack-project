import './css/BackButton.css';
import { useLocation } from 'react-router-dom';

export default function BackButton() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const handleBackClick = () => {
        window.history.back();
    };

    return (
        <div className="back-button">
            {!isHomePage &&
            <button onClick={handleBackClick}>
                {"<"}
            </button>
            }
        </div>
    );
}