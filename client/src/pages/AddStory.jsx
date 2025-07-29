import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FiHome, FiBookOpen } from 'react-icons/fi';

function AddStory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentId, setCurrentId] = useState(id);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [cover, setCover] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [chapters, setChapters] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [saved, setSaved] = useState(false); 
  const [saveMessage, setSaveMessage] = useState(''); 
  const [showWarning, setShowWarning] = useState(false); 

  const isValid = title && author && synopsis && category && status;

  useEffect(() => {
    setCurrentId(id);
  }, [id]);

  useEffect(() => {
    const fetchStory = async () => {
      if (!currentId) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/stories/${currentId}`);
        if (!res.ok) throw new Error('Failed to fetch story');
        const data = await res.json();
        setTitle(data.title);
        setAuthor(data.writers);
        setSynopsis(data.synopsis);
        setCategory(data.category);
        setStatus(data.status);
        setTags(data.keyword || []);
        setCover(data.cover);
        setChapters(data.chapters || []);
        setSaved(true);
      } catch (err) {
        console.error('Error fetching story:', err);
      }
    };

    fetchStory();
  }, [currentId, location.key]);

  useEffect(() => {
    setSaved(false);
    setSaveMessage('');
  }, [title, author, synopsis, category, status, cover, tags]);

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!isValid) {
      alert('Please fill all required fields before saving!');
      return false;
    }

    const storyData = {
      title,
      writers: author,
      synopsis,
      category,
      status,
      keyword: tags,
      cover: cover ?? '',
      chapters,
    };

    try {
      let res, data;

      if (!currentId) {
        res = await fetch(`${import.meta.env.VITE_API_URL}/api/stories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(storyData),
        });

        if (!res.ok) throw new Error('Failed to create story');
        data = await res.json();

        setCurrentId(data._id);

        navigate(`/story/${data._id}/edit`);
      } else {
        res = await fetch(`${import.meta.env.VITE_API_URL}/api/stories/${currentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(storyData),
        });
        if (!res.ok) throw new Error('Failed to update story');
      }

      setSaved(true);
      setSaveMessage('Data berhasil disimpan');
      setShowWarning(false);
      return true;
    } catch (err) {
      console.error('Save error:', err);
      alert('Gagal menyimpan data. Coba lagi.');
      return false;
    }
  };

  const handleAddChapter = async () => {
    if (!isValid) {
      alert('Please fill all required fields before adding a chapter!');
      return;
    }

    if (!saved) {
      setShowWarning(true);
      alert('Anda harus menyimpan cerita terlebih dahulu sebelum menambah chapter!');
      return;
    }

    navigate(`/story/${currentId}/add-chapter`);
  };

  return (
    <div className="flex min-h-screen font-inter">
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

      <div className="flex-1 p-12 max-w-6xl mx-auto relative">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{currentId ? 'Edit' : 'Add'} Story</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <FormGroup label="Title" value={title} onChange={setTitle} />
          <FormGroup label="Author" value={author} onChange={setAuthor} />
          <div className="md:col-span-2">
            <FormGroup label="Synopsis" value={synopsis} onChange={setSynopsis} textarea />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Select Category</option>
              {[
                'Fiction', 'Non-Fiction', 'Romance', 'Adventure', 'Fantasy', 'Science Fiction (Sci-Fi)',
                'Mystery & Thriller', 'Horror', 'Drama', 'Comedy', 'Young Adult (YA)', "Children's Books",
                'History', 'Biography', 'Psychology', 'Self-Development', 'Business & Economics',
                'Technology', 'Health & Wellness', 'Education', 'Religion & Spirituality', 'Social & Politics',
                'Law', 'Science', 'Philosophy', 'Travel', 'Cooking / Culinary', 'Poetry', 'Fanfiction'
              ].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Story Cover</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  setCover(reader.result);
                };
                reader.readAsDataURL(file);
              }}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
            />
            {cover && (
              <img
                src={cover}
                alt="Story Cover"
                className="mt-2 w-32 h-auto rounded-md border border-gray-300"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">Tags / Keyword</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Type and press Enter"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md"
              />
              <button type="button" onClick={handleAddTag} className="px-4 py-2 text-sm bg-violet-600 text-white rounded-full hover:bg-violet-700 transition">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs">
                  {tag} <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-red-500">×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Select Status</option>
              <option value="Publish">Publish</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {showWarning && (
          <p className="mt-3 text-red-600 font-semibold">Anda harus menyimpan cerita terlebih dahulu sebelum menambah chapter.</p>
        )}

        {saveMessage && (
          <p className="mt-3 text-green-600 font-semibold">{saveMessage}</p>
        )}

        <h3 className="text-3xl font-bold text-gray-900 mt-10 mb-4">Chapters</h3>
        <button
          disabled={!isValid || !saved}
          onClick={handleAddChapter}
          className={`mb-4 px-4 py-2 text-sm rounded-full transition ${
            (!isValid || !saved) ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-violet-600 text-white hover:bg-violet-700'
          }`}
        >
          + New Chapter
        </button>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr>
                <th className="p-3 border-b">Chapter Title</th>
                <th className="p-3 border-b">Last Updated</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((ch, index) => (
                <tr key={index} className="border-b text-gray-800">
                  <td className="p-3">{ch.title}</td>
                  <td className="p-3 text-gray-600">{ch.updatedAt}</td>
                  <td className="p-3 space-x-2">
                    <button className="text-blue-600 hover:underline rounded-full px-3 py-1 text-xs border border-blue-200">Edit</button>
                    <button className="text-red-600 hover:underline rounded-full px-3 py-1 text-xs border border-red-200">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={() => setShowCancelModal(true)} className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 text-sm text-white rounded-full transition ${
              isValid ? 'bg-violet-600 hover:bg-violet-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!isValid}
          >
            Save
          </button>
        </div>

        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl text-center max-w-sm w-full">
              <p className="text-gray-800">
                Are you sure you want to cancel editing the story without saving the data?
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button onClick={() => navigate('/')} className="px-4 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                  Yes
                </button>
                <button onClick={() => setShowCancelModal(false)} className="px-4 py-2 text-sm bg-gray-200 rounded-full hover:bg-gray-300 transition">
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

function FormGroup({ label, value, onChange, textarea = false }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md resize-y focus:ring-2 focus:ring-violet-500"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500"
        />
      )}
    </div>
  );
}

export default AddStory;