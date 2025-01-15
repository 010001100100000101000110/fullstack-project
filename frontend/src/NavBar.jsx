import { Link } from 'react-router-dom';
import './css/NavBar.css';

/**
 * NavBar component renders a navigation bar with a link to the front page.
 *
 * @returns JSX element representing the navigation bar.
 */
export default function NavBar() {
    return (
        <nav className='nav-bar'>
            <Link to="/">
                <button id="main-page-btn">
                    Role selection
                </button>
            </Link>
        </nav>
    )
}