import React, { useState, useRef, useEffect } from 'react';

const JournalForm: React.FC = () => {
  const [fontStyle, setFontStyle] = useState('Arial');
  const [isEmpty, setIsEmpty] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const editorRef = useRef<HTMLDivElement>(null);

  const toggleFormat = (command: 'bold' | 'italic' | 'underline') => {
    document.execCommand(command, false);
    updateActiveFormats();
    editorRef.current?.focus();
  };

  const updateActiveFormats = () => {   
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontStyle(e.target.value);
    document.execCommand('fontName', false, e.target.value);
    editorRef.current?.focus();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.execCommand('foreColor', false, e.target.value);
    editorRef.current?.focus();
  };

  const checkEmpty = () => {
    const content = editorRef.current?.innerHTML.replace(/<[^>]+>/g, '').trim() || '';
    setIsEmpty(content === '');
    setCharCount(content.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = editorRef.current?.innerHTML || '';
    console.log('Journal submitted:', content);
    if (editorRef.current) editorRef.current.innerHTML = '';
    setIsEmpty(true);
    setCharCount(0);
  };

  const handleBack = () => {
    window.history.back(); // Or your routing logic
  };

  useEffect(() => {
    const update = () => updateActiveFormats();
    document.addEventListener('selectionchange', update);
    return () => document.removeEventListener('selectionchange', update);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen px-2 sm:px-4 py-4 relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-10 bg-sky-700 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-md"
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

      <div className="flex flex-col w-full max-w-4xl mx-auto mt-16 sm:mt-20 lg:mt-6">
        {/* Toolbar */}
        <div className="bg-gray-800/90 backdrop-blur-sm text-white rounded-t-xl shadow-xl px-3 sm:px-4 py-3 flex flex-col sm:flex-row flex-wrap sm:items-center sm:gap-3 gap-2">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto scrollbar-hide sm:overflow-visible">
            {([
              { cmd: 'bold', label: 'B', className: 'font-bold' },
              { cmd: 'italic', label: 'I', className: 'italic' },
              { cmd: 'underline', label: 'U', className: 'underline' },
            ] as const).map(({ cmd, label, className }) => (
              <button
                key={cmd}
                onClick={() => toggleFormat(cmd)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-150 text-lg shadow-sm ${
                  activeFormats[cmd]
                    ? 'bg-blue-700 text-white border border-black shadow-md'
                    : 'bg-sky-700 hover:bg-blue-700'
                } ${className}`}
                title={cmd.charAt(0).toUpperCase() + cmd.slice(1)}
              >
                {label}
              </button>
            ))}

            <select
              value={fontStyle}
              onChange={handleFontChange}
              className="border border-gray-700 bg-white text-gray-900 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-700"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>

            <input
              type="color"
              onChange={handleColorChange}
              className="h-10 w-10 border border-gray-700 rounded-full cursor-pointer"
              title="Text Color"
            />

            <span className="text-gray-400 text-sm ml-2">
              {charCount} {charCount === 1 ? 'character' : 'characters'}
            </span>
          </div>

          <div className="sm:ml-auto">
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-sky-700 px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-150 shadow-md"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="relative flex-1">
          {isEmpty && (
            <div className="absolute top-6 left-6 text-gray-400 pointer-events-none select-none animate-fade-in">
              Start writing your journal...
            </div>
          )}

          <div
            ref={editorRef}
            contentEditable
            className="w-full h-[65vh] sm:h-[80vh] lg:h-[85vh] bg-white/95 border border-gray-700 text-gray-900 p-6 rounded-b-xl overflow-auto focus:outline-none focus:ring-4 focus:ring-blue-700/50 shadow-lg transition-all duration-200"
            onInput={() => {
              checkEmpty();
              updateActiveFormats();
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default JournalForm;
