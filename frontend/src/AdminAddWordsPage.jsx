import { useState } from "react";
import AdminWordPairPage from "./AdminWordPairPage";

export default function AdminAddWordsPage() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 2000);
    };

    return (
        <div>
            {saved ? <h2>Word pair saved!</h2> : <AdminWordPairPage onSave={handleSave} />}
        </div>
    );
}
