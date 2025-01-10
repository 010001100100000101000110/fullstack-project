import "./css/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from "./NavBar";
import FrontPage from "./FrontPage";
import AdminLoginPage from "./AdminLoginPage";
import AdminPage from "./AdminPage";
import AdminAddWordsPage from "./AdminAddWordsPage";
import AdminEditWordsPage from "./AdminEditWordsPage";
import AdminAddTagsPage from "./AdminAddTagsPage";
import AdminEditTagsPage from "./AdminEditTagsPage";
import StudentMainPage from "./StudentMainPage";
import StudentPlayAllWords from "./StudentPlayAllWords";
import StudentPlayFilteredWords from "./StudentPlayFilteredWords";
/**
 *
 * @returns
 */
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        {NavBar()}
        <div className="contents">
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add-words" element={<AdminAddWordsPage />} />
            <Route path="/admin/edit-words/:id" element={<AdminEditWordsPage />} />
            <Route path="/admin/add-tag" element={<AdminAddTagsPage />} />
            <Route path="/admin/edit-tag/:id" element={<AdminEditTagsPage />} />

            <Route path="/student" element={<StudentMainPage />} />
            <Route path="/student/play-all" element={<StudentPlayAllWords />} />
            <Route path="/student/play-filtered" element={<StudentPlayFilteredWords />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;