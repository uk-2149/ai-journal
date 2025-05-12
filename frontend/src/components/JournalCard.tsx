import type { Journal } from '../types/types';
import DOMPurify from 'dompurify';

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

  const moodColors: { [key: string]: string } = {
    Positive: 'bg-green-500',
    Negative: 'bg-red-500',
    Neutral: 'bg-gray-500',
  };

  return (
    <div className="bg-white/95 rounded-lg shadow-lg p-6 border border-gray-700">
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
            moodColors[journal.mood] || 'bg-gray-500'
          }`}
        >
          {journal.mood}
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