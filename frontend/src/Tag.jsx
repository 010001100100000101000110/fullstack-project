import './css/Tag.css';
import PropTypes from 'prop-types';

export default function Tag({tag}) {

    const handleClick = async (id) => {
        window.location.href = `/admin/edit-tag/${id}`;
    }

    return (
        <div className='tag-list-element'>
            <p>{tag.id}</p>
            <p>Name: {tag.name}</p>
            <button className="edit-tag-btn" onClick={() => handleClick(tag.id)}>
                Edit
            </button>
        </div>
    )
}
Tag.propTypes = {
    tag: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string
    }).isRequired
};