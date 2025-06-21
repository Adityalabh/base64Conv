import React from "react";

const DarkModeToggle = ({isDarkMode,setIsDarkMode}) => {

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (
    <div className="w-[12rem]">
      <button
        onClick={toggleTheme}
        className="flex cursor-pointer p-2  items-center gap-2 lg:p-2  px-4 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? (
          <>
            <i className="fa-solid fa-sun text-yellow-500 "></i>
            Light Mode
          </>
        ) : (
          <>
            <i className="fa-solid fa-moon text-indigo-500"></i>
            Dark Mode
          </>
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
