import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiHome, FiBookOpen } from 'react-icons/fi';

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stories/${id}`);
        if (!res.ok) throw new Error('Story not found');
        const data = await res.json();
        setStory(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading)
    return <p className="text-center py-10 text-gray-500 text-sm">Loading...</p>;

  if (error)
    return <p className="text-center py-10 text-red-500 text-sm">{error}</p>;

  return (
    <div className="flex min-h-screen font-inter bg-white">
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
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Story Detail</h2>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-6">
          <DetailField label="Title" value={story.title} />
          <DetailField label="Author" value={story.writers} />
          <DetailField label="Category" value={story.category} />
          <DetailField
            label="Status"
            value={
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  story.status === 'Publish'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {story.status}
              </span>
            }
          />
          <DetailField
            label="Tags"
            value={
              <div className="flex flex-wrap gap-2">
                {story.keyword?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-violet-100 text-violet-700 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            }
          />
          <DetailField
            label="Last Updated"
            value={new Date(story.lastUpdated).toLocaleString()}
          />
          <DetailField
            label="Synopsis"
            value={
              <p className="whitespace-pre-line text-gray-800 leading-relaxed text-sm">
                {story.synopsis}
              </p>
            }
          />
        </div>

        <div className="absolute bottom-12 right-12">
          <button
            onClick={() => navigate(-1)}
            className="bg-violet-600 text-white px-5 py-2.5 rounded-full hover:bg-violet-700 text-sm transition-all"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailField({ label, value }) {
  return (
    <div className="border-b border-gray-100 pb-4">
      <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
      <div className="text-gray-800 text-sm">{value}</div>
    </div>
  );
}

export default StoryDetail;