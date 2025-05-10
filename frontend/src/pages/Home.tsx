import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import JournalCard from '../components/JournalCard';
import type { Journal } from '../types/types';

const Home = () => {
    const navigate = useNavigate();
    const [journals, setJournals] = useState<Journal[]>([
      // Mock data
      {
        id: '1',
        content: '<p><b>Today was amazing!</b> I went hiking with friends...</p>',
        createdAt: new Date('2025-05-09T10:00:00Z'),
        mood: 'Positive',
      },
      {
        id: '2',
        content: '<p>Feeling a bit overwhelmed with work...</p>',
        createdAt: new Date('2025-05-08T14:30:00Z'),
        mood: 'Negative',
      },
    ]);
  
    return (
      <div className="bg-gray-900 min-h-screen relative">
        <Navbar />
        {/* Hero Section */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="bg-gradient-to-r from-sky-700 to-blue-700 rounded-xl shadow-lg p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Reflect. Write. Grow.
            </h1>
            <p className="text-gray-200 text-lg">
              Capture your thoughts and discover your mood with AI insights.
            </p>
          </div>
        </div>
        {/* Journal List */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Journals</h2>
          {journals.length === 0 ? (
            <p className="text-gray-400">No journals yet. Start writing!</p>
          ) : (
            <div className="grid gap-6">
              {journals.map((journal) => (
                <JournalCard key={journal.id} journal={journal} />
              ))}
            </div>
          )}
        </div>
        {/* + button */}
        <button
          className="fixed bottom-6 right-6 sm:hidden bg-sky-700 text-white p-4 rounded-full hover:bg-blue-700 transition-all duration-150 shadow-lg hover:scale-105"
          onClick={() => navigate('/journal')}
          title="Write a New Journal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    );
  };
  
  export default Home;