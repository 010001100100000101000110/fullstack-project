import "./css/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from "./NavBar";
import FrontPage from "./FrontPage";
import AdminLoginPage from "./AdminLoginPage";
import AdminPage from "./AdminPage";
import AdminAddWordsPage from "./AdminAddWordsPage";
import AdminEditWordsPage from "./AdminEditWordsPage";
import StudentMainPage from "./StudentMainPage";
import StudentPlayAllWords from "./StudentPlayAllWords";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        {NavBar()}
        <div>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add-words" element={<AdminAddWordsPage />} />
            <Route path="/admin/edit-words/:id" element={<AdminEditWordsPage />} />
            <Route path="/student" element={<StudentMainPage />} />
            <Route path="/student/play-all" element={<StudentPlayAllWords />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;