import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiHome, FiBookOpen } from 'react-icons/fi';

function AddChapter() {
  const navigate = useNavigate();
  const { id: storyId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Chapter title and content cannot be empty.');
      return;
    }

    const chapterData = {
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stories/${storyId}/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chapterData),
      });

      if (!response.ok) throw new Error('Failed to save chapter');
      navigate(`/story/${storyId}/edit`);
    } catch (err) {
      console.error('Error saving chapter:', err);
    }
  };

  return (
    <div className="flex min-h-screen font-inter">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 px-8 py-10 space-y-10 bg-white shadow-md">
        <h1 className="text-4xl font-extrabold tracking-tight text-violet-600">Storyku</h1>

        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700 text-base font-semibold hover:text-violet-600 cursor-pointer transition-all duration-150">
            <FiHome className="text-xl" />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 text-base font-semibold hover:text-violet-600 cursor-pointer transition-all duration-150">
            <FiBookOpen className="text-xl" />
            <span>Story Management</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-12 max-w-6xl mx-auto relative">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Add Chapter</h2>

        <div className="space-y-6 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Chapter Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Story Chapter</label>
            <div className="bg-white border border-gray-300 rounded-md">
              <ReactQuill
                value={content}
                onChange={setContent}
                className="rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-violet-600 text-white rounded-full hover:bg-violet-700 transition"
          >
            Save
          </button>
        </div>

        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl text-center max-w-sm w-full">
              <p className="text-gray-800">
                Are you sure you want to cancel adding the chapter without saving the data?
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => navigate(`/story/${storyId}/edit`)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddChapter;