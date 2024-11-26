import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import TextAnalyzer from './components/TextAnalyzer/TextAnalyzer'
import './App.scss'
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/Sidebar';
import HomePage from './pages/HomePage/HomePage';
import PostsPage from './pages/PostsPage/PostsPage';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api/analyze" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
