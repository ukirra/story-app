import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoryList from './pages/StoryList';
import AddStory from './pages/AddStory';
import EditStory from './pages/EditStory';
import StoryDetail from './pages/StoryDetail';
import AddChapter from './pages/AddChapter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryList />} />
        <Route path="/story/add" element={<AddStory />} />
        <Route path="/story/:id" element={<StoryDetail />} />
        <Route path="/story/:id/edit" element={<EditStory />} />
        <Route path="/story/:id/add-chapter" element={<AddChapter />} />
      </Routes>
    </Router>
  );
}

export default App;