import type { Journal } from '../types/types';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

interface JournalCardProps {
  journal: Journal;
}

const JournalCard = ({ journal }: JournalCardProps) => {
  const getPreview = (content: string) => {
    const div = document.createElement('div');
    div.innerHTML = DOMPurify.sanitize(content);
    const text = div.textContent || div.innerText || '';
    return text.slice(0, 100) + (text.length > 100 ? '...' : '');
  };
  const navigate = useNavigate();

  const moodColors: Record<string, string> = {
    happy: 'bg-green-500',
    sad: 'bg-blue-500',
    angry: 'bg-red-500',
    stressed: 'bg-yellow-500'
  };

  const dominantMood = Object.keys(journal.mood).reduce((a, b) =>
    journal.mood[a as keyof typeof journal.mood] > journal.mood[b as keyof typeof journal.mood] ? a : b
  );  
  
  const handleClick = () => {
    navigate(`/journal/${journal.id}`);
  };


  return (
    <div className="bg-white/95 rounded-lg shadow-lg p-6 border border-gray-700" onClick={handleClick}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-900 font-semibold">
          {new Date(journal.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        <span
  className={`px-3 py-1 rounded-full text-white text-sm ${
    moodColors[dominantMood] || 'bg-gray-500'
  }`}
>
  {dominantMood.charAt(0).toUpperCase() + dominantMood.slice(1)}
</span>

      </div>
      {/* <div
        className="text-gray-900"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(journal.content),
        }}
      /> */}
      <p className="text-gray-700 mt-2">{getPreview(journal.content)}</p>
    </div>
  );
};

export default JournalCard;