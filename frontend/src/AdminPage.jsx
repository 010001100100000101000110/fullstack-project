import './css/AdminPage.css';
import { Link } from 'react-router-dom';
import WordTable from './WordTable';
import TagList from './TagList';

/**
 * AdminPage component is the main page where the admin can manage word pairs and tags.
 * It displays existing word pairs in a table, and provides options to add new word pairs and tags.
 *
 * @returns A JSX element representing the main admin page, with links to managing word pairs and tags.
 */
export default function AdminPage() {

    //Render the main page for admin
    return (
        <div id='admin-page'>
            <h1>Welcome Admin!</h1>
            <div id="admin-page-contents">
                {/* Word management section */}
                <div id="word-managing-container">
                    <h2>Words</h2>
                    {/* Link to the page for adding a new word pair */}
                    <Link to="/admin/add-words">
                        <button id="add-words-btn" className="admin-page-btn">
                            Add new wordpair
                        </button>
                    </Link>
                    {/* WordTable component displays the current list of word pairs */}
                    <WordTable />
                </div>
                {/* Tag management section */}
                <div id="tag-managing-container">
                    <h2>Tags</h2>
                    {/* Link to the page for adding a new tag */}
                    <Link to="/admin/add-tag">
                        <button id="add-tags-btn" className="admin-page-btn">
                            Add new tag
                        </button>
                    </Link>
                    {/* TagList component displays the current list of tags */}
                    <TagList />
                </div>
            </div>
        </div>
    )
}