//visual element which shows wordpair and handles deletion of said pair

import './css/Wordpair.css';
import { Link } from 'react-router-dom';

export default function Wordpair({pair}) {

    const url = `/admin/edit-words/${pair.id}`;
    return (
        <div className="wordpair">
            <p className="english-word">eng: {pair.english}</p>
            <p className="finnish-word">fin: {pair.finnish}</p>

            <Link to={url}>
                <button className="edit-word-btn">
                    Edit
                </button>
            </Link>
        </div>
    )
}
