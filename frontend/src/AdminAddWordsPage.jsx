import { useState } from "react";
import AdminWordPairPage from "./AdminWordPairPage";
/**
 * AdminAddWordsPage component renders a page to add a new word pair.
 * It displays a "Word pair saved!" message when a word pair is saved.
 *
 * @returns A JSX element representing the page that either shows the AdminWordPairPage component to add a word pair or a success message after saving the word pair.
 */
export default function AdminAddWordsPage() {
    // State to track if a word pair has been saved.
    const [saved, setSaved] = useState(false);

    /**
     * handleSave function is triggered when a word pair is saved. Shows a brief "Word pair saved!" message.
     */
    const handleSave = () => {
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 1500);
    };

    //Render either a saving message or page to add word pairs
    return (
        <div>
            {saved ? <h2>Word pair saved!</h2> : <AdminWordPairPage onSave={handleSave} />}
        </div>
    );
}
