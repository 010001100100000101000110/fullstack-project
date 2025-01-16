import './css/Tag.css';
import PropTypes from 'prop-types';

/**
 * Tag component displays a tag's name with an edit button that redirects to an edit page.
 *
 * @param {Object} tag - The tag object containing details of the tag.
 * @returns A JSX element containing the tag name and an edit button.
 */
export default function Tag({tag}) {

    /**
     * handleClick function redirects to the edit page for the given tag ID.
     *
     * @param {number} id - The ID of the tag to be edited.
     */
    const handleClick = async (id) => {
        window.location.href = `/admin/edit-tag/${id}`;
    }

    //Render the tag component
    return (
        <div className='tag-list-element'>
            <p className='tag-name'>{tag.name}</p>
            <button className="edit-btn" onClick={() => handleClick(tag.id)}>
                Edit
            </button>
        </div>
    )
}

//Prop validation for the Tag component
Tag.propTypes = {
    tag: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};