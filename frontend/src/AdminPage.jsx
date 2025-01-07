//Page which lets the admin see and delete existing wordpairs and add new ones after clicking "Add wordpair" button

import './css/FrontPage.css';
import { Link } from 'react-router-dom';


import WordTable from './WordTable';

export default function AdminPage() {

    return (
        <div>
            <h1>Word Database</h1>

            <Link to="/admin/add-words">
                <button id="add-words-btn">
                    Add wordpair
                </button>
            </Link>

            <WordTable />
        </div>
    )
}