import { useState } from "react";
import AdminTagPage from './AdminTagPage';

export default function AdminAddTagsPage() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 1500);
    };

    return (
        <div>
            {saved ? <h2>Tag saved!</h2> : <AdminTagPage onSave={handleSave} />}
        </div>
    );
}