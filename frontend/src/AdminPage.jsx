//Page which lets the admin see and delete existing wordpairs and add new ones after clicking "Add wordpair" button

import './css/AdminPage.css';
import { Link } from 'react-router-dom';
import WordTable from './WordTable';

//**
//
//
// */
export default function AdminPage() {

    return (
        <div id='admin-page'>
            <h1>Welcome Admin!</h1>

            <Link to="/admin/add-words">
                <button id="add-words-btn">
                    Add wordpair
                </button>
            </Link>

            <WordTable />
        </div>
    )
}