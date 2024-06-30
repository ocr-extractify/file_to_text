import { useState, useEffect } from 'react';
import { IoMdSunny } from 'react-icons/io';
import { IoMdMoon } from 'react-icons/io';
type Props = {
  className?: string;
};

const DarkModeToggle = ({ className }: Props) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition duration-300 ease-in-out transform shadow-md shadow-indigo-300 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      } ${className}`}
    >
      {darkMode ? (
        <IoMdMoon className="w-5 h-5" />
      ) : (
        <IoMdSunny className="w-5 h-5" />
      )}
    </button>
  );
};

export default DarkModeToggle;
