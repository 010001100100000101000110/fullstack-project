import './css/BackButton.css';
import { useLocation } from 'react-router-dom';

/**
 * BackButton component renders a button that allows the user to navigate to the previous page.
 * The button is disabled on certain pages.
 * The author didn't have time to implement back buttons to every page
 * and was too lazy to do anything but disable the component on certain pages.
 *
 * @returns JSX element representing the back button.
 */
export default function BackButton() {
    const location = useLocation();
    const disableButton =
        location.pathname === '/'
        || location.pathname === '/admin'
        || location.pathname === '/student'
        || location.pathname === '/student/play-all'
        || location.pathname === '/student/play-filtered';

    /**
     * handleBackClick function redirects to the previous page
     */
    const handleBackClick = () => {
        window.history.back();
    };

    //Render the button
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