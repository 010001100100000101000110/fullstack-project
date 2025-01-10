import './css/StudentMainPage.css';
import { Link } from 'react-router-dom';
import StudentOptionsSelection from './StudentOptionsSelection';
/**
 * page which allows the user to choose a practicing mode
 */
export default function StudentMainPage() {

    const handleClick = () => {
        window.location.href = "/";
    }

    return (
        <div>
            <div>
                <StudentOptionsSelection />
            </div>
        </div>
    )
}