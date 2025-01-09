//visual element which shows wordpair and handles deletion of said pair

import './css/Wordpair.css';
import PropTypes from 'prop-types';
//**
//
//
//
// */
export default function Wordpair({pair}) {

    const url = `/admin/edit-words/${pair.id}`;
    const handleClick = async () => {
        window.location.href = url;
    }

    return (
        <div className="wordpair">
            <p>{pair.id}</p>
            <p className="english-word">EN: {pair.english}</p>
            <p className="finnish-word">FI: {pair.finnish}</p>
            <p className="swedish-word">SW: {pair.swedish}</p>
            <button className="edit-word-btn" onClick={handleClick}>
                Edit
            </button>
        </div>
    )
}

Wordpair.propTypes = {
    pair: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]). isRequired,
        english: PropTypes.string.isRequired,
        finnish: PropTypes.string.isRequired,
        swedish: PropTypes.string.isRequired,
    }).isRequired,
};