import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import type { Journal } from '../types/types';
import Navbar from '../components/NavBar';

const JournalPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJournal = async () => {
      if (!auth.currentUser) {
        setError('Please sign in to view this journal.');
        setLoading(false);
        return;
      }

      if (!id) {
        setError('Invalid journal ID.');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching journal:', id);
        const journalRef = doc(db, 'journals', id);
        const journalSnap = await getDoc(journalRef);

        if (!journalSnap.exists()) {
          setError('Journal not found.');
          setLoading(false);
          return;
        }

        const data = journalSnap.data();
        if (data.userId !== auth.currentUser.uid) {
          setError('You do not have permission to view this journal.');
          setLoading(false);
          return;
        }

        setJournal({
          id: journalSnap.id,
          content: data.content,
          createdAt: data.createdAt.toDate(),
          mood: data.mood,
        });
        setError(null);
      } catch (error: any) {
        console.error('Failed to fetch journal:', error.message, error.code);
        setError(`Failed to fetch journal: ${error.message} (Code: ${error.code})`);
      } finally {
        setLoading(false);
      }
    };

    fetchJournal();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-900 min-h-screen relative">
      <Navbar />
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed sm:absolute hidden md:block top-4 left-4 z-10 bg-sky-700 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-md sm:shadow-lg"
        title="Back"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex flex-col w-[90vw] md:w-full max-w-4xl mx-auto mt-0">
        {loading ? (
          <p className="text-gray-400 text-center">Loading journal...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : journal ? (
          <div className="bg-gray-800/90 rounded-xl shadow-lg p-6 mt-30 lg:mt-24">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {new Date(journal.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h2>
            <p className="text-sky-400 mb-4">Mood: {journal.mood}</p>
            <div
              className="prose prose-invert max-w-none text-gray-200"
              dangerouslySetInnerHTML={{ __html: journal.content }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default JournalPage;