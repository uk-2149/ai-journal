import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import JournalCard from '../components/JournalCard';
import type { Journal } from '../types/types';

function JournalList() {
    const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user?.uid);
      if (!user) {
        setError('Please sign in to view journals.');
        setLoading(false);
        return;
      }

      const fetchJournals = async () => {
        try {
          console.log('Fetching journals for user:', user.uid);
          const q = query(
            collection(db, 'journals'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
          );
          const querySnapshot = await getDocs(q);
          console.log('Query snapshot size:', querySnapshot.size);
          const fetchedJournals = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            content: doc.data().content,
            createdAt: doc.data().createdAt.toDate(),
            mood: doc.data().mood,
          })) as Journal[];
          setJournals(fetchedJournals);
          setError(null);
        } catch (error: any) {
          console.error('Failed to fetch journals:', error.message, error.code);
          setError(`Failed to fetch journals: ${error.message} (Code: ${error.code})`);
        } finally {
          setLoading(false);
        }
      };
      fetchJournals();
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Your Journals</h2>
        {loading ? (
          <p className="text-gray-400">Loading journals...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : journals.length === 0 ? (
          <p className="text-gray-400">No journals yet. Start writing!</p>
        ) : (
          <div className="grid gap-6">
            {journals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JournalList;