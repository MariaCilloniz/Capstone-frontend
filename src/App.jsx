import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { useState } from 'react';
// import TextAnalyzer from './components/TextAnalyzer/TextAnalyzer'
import './App.scss'
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/Sidebar';
import HomePage from './pages/HomePage/HomePage';
import PostsPage from './pages/PostsPage/PostsPage';
import SubRedditPage from './pages/SubredditPage/SubRedditPage';
import SuggestionPage from './pages/SuggestionPage/SuggestionPage';

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  return (
    <BrowserRouter>
    <Header />
    <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage setSelectedPost={setSelectedPost} />} />
        <Route path="/subreddit" element={<SubRedditPage setSelectedPost={setSelectedPost} />} />
        <Route 
          path="/suggestion" 
          element={
            selectedPost ? (
              <SuggestionPage 
                postData={selectedPost.postData} 
                analysisId={selectedPost.analysisId}
                chartData={selectedPost.chartData}
              />
            ) : (
              <Navigate to="/subreddit" /> 
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
