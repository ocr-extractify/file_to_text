import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
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
  const ref = useRef<HTMLButtonElement | null>(null);

  const toggleDarkMode = async () => {
    console.log('document.startViewTransition', document.startViewTransition);
    console.log(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDarkMode(!darkMode);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setDarkMode(!darkMode);
      });
    }).ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      },
    );

    console.log('document', document.documentElement);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition duration-300 ease-in-out transform shadow-md shadow-indigo-300 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      } ${className}`}
      ref={ref}
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
