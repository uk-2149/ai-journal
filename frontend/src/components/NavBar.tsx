const Navbar = () => {
    return (
      <nav className="bg-gray-800/90 backdrop-blur-sm w-full fixed top-0 z-10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-white">
            JournalSphere
          </div>

          <div className="flex items-center gap-3">

            <button
              className="hidden sm:block bg-sky-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-150 shadow-md"
              // navigate
            >
              Write a New Journal
            </button>

            <div className="ml-auto">
              <img
                src="https://picsum.photos/40/40?random=1"
                alt="Profile"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-sky-700 hover:border-blue-700 transition-all duration-150 shadow-md cursor-pointer"
                // navigate
              />
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;