//Page which lets the admin see and delete existing wordpairs and add new ones after clicking "Add wordpair" button

import './css/AdminPage.css';
import { Link } from 'react-router-dom';
import WordTable from './WordTable';
import TagList from './TagList';
//**
//
//
// */
export default function AdminPage() {

    return (
        <div id='admin-page'>
            <h1>Welcome Admin!</h1>
            <div id="admin-page-contents">
                <div id="word-managing-container">
                    <h2>Words</h2>
                    <Link to="/admin/add-words">
                        <button id="add-words-btn" className="admin-page-btn">
                            Add new wordpair
                        </button>
                    </Link>
                    <WordTable />
                </div>

                <div id="tag-managing-container">
                    <h2>Tags</h2>
                    <Link to="/admin/add-tag">
                        <button id="add-tags-btn" className="admin-page-btn">
                            Add new tag
                        </button>
                    </Link>
                    <TagList />
                </div>
            </div>
        </div>
    )
}