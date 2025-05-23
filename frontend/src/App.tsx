import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JournalForm from './pages/JournalForm';
import JournalPage from './pages/JournalPage';
// import JournalForm from './pages/JournalForm';

function App() {

  const isLogIn = localStorage.getItem('token') != null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLogIn ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/journalform" element={isLogIn ? <JournalForm /> : <Navigate to="/login" />} />
        <Route path="/journal/:id" element={isLogIn ? <JournalPage /> : <Navigate to="/login" />} />
        {/* <Route path="/journal" element={<JournalForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;