import { useState } from "react";
import AdminTagPage from './AdminTagPage';
/**
 * AdminAddTagsPage component renders a page to add a new tag.
 * It displays a "Tag saved!" message when a tag is saved.
 *
 * @returns A JSX element representing the page that either shows the AdminTagPage component to add a tag or a success message after saving the tag.
 */
export default function AdminAddTagsPage() {
    // State to track if a tag has been saved.
    const [saved, setSaved] = useState(false);

    /**
     * handleSave function is triggered when a tag is saved. Shows a brief "Tag saved!" message.
     */
    const handleSave = () => {
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 1500);
    };

    //Render either a saving message or page to add tags
    return (
        <div>
            {saved ? <h2>Tag saved!</h2> : <AdminTagPage onSave={handleSave} />}
        </div>
    );
}