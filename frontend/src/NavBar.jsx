import { Link } from 'react-router-dom';
import './css/NavBar.css';

export default function NavBar() {
    return (
        <nav className='nav-bar'>
            <Link to="/">
                <button id="main-page-btn">
                    Home
                </button>
            </Link>
        </nav>
    )
}