import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter, FiSearch, FiHome, FiBookOpen, FiPlus, FiEye, FiEdit2 } from 'react-icons/fi';

const CATEGORY_OPTIONS = [
  'Fiction', 'Non-Fiction', 'Romance', 'Adventure', 'Fantasy',
  'Science Fiction (Sci-Fi)', 'Mystery & Thriller', 'Horror', 'Drama',
  'Comedy', 'Young Adult (YA)', "Children's Books", 'History', 'Biography',
  'Psychology', 'Self-Development', 'Business & Economics', 'Technology',
  'Health & Wellness', 'Education', 'Religion & Spirituality',
  'Social & Politics', 'Law', 'Science', 'Philosophy', 'Travel',
  'Cooking / Culinary', 'Poetry', 'Fanfiction'
];

function StoryList() {
  const [searchText, setSearchText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [storyList, setStoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const queryParams = new URLSearchParams({
          search: searchText,
          category: selectedCategory,
          status: selectedStatus,
        });

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stories?${queryParams.toString()}`);
        const data = await res.json();
        setStoryList(data);
        setCurrentPage(1);
      } catch (err) {
        console.error('Failed to fetch stories:', err);
      }
    };

    fetchStories();
  }, [searchText, selectedCategory, selectedStatus]);

  const paginatedStories = storyList.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(storyList.length / perPage);

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
      <div className="flex-1 p-8">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Stories</h2>
              <p className="text-gray-500">Manage your stories here</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search by Writers / Title"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center gap-2 px-5 py-2 border border-violet-600 text-violet-600 hover:bg-violet-50 rounded-full text-sm shadow-sm"
              >
                <FiFilter />
                Filter
              </button>
              <button
                onClick={() => navigate('/story/add')}
                className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-full shadow"
              >
                <FiPlus className="text-base" />
                Add Story
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Writers</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Keyword</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {paginatedStories.map((story, index) => (
                <tr key={story._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{(currentPage - 1) * perPage + index + 1}</td>
                  <td className="px-6 py-4 font-medium">{story.title}</td>
                  <td className="px-6 py-4">{story.writers}</td>
                  <td className="px-6 py-4">{story.category}</td>
                  <td className="px-6 py-4 space-x-1">
                    {(story.keyword || []).map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        story.status === 'Publish'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {story.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => navigate(`/story/${story._id}`)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-white rounded-full text-xs font-semibold bg-purple-600 hover:bg-purple-700 transition"
                      title="Detail"
                    >
                      <FiEye />
                      Detail
                    </button>
                    <button
                      onClick={() => navigate(`/story/${story._id}/edit`)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-white rounded-full text-xs font-semibold bg-violet-500 hover:bg-violet-600 transition"
                      title="Edit"
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full text-sm ${
                  currentPage === i + 1
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {showFilterModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white w-[320px] rounded-xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Filter</h3>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-violet-500"
                >
                  <option value="">All</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-violet-500"
                >
                  <option value="">All</option>
                  <option value="Publish">Publish</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 text-sm"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryList;