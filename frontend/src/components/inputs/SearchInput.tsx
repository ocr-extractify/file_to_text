import { SEARCH_INPUT_DEFAULT_PLACEHOLDER } from '@/constants/uiTexts';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({ setQuery }: Props) => {
  return (
    <div className="relative">
      <FaSearch className="pointer-events-none absolute top-3.5 left-4 h-4 w-4 text-gray-500 dark:text-white" />
      <input
        placeholder={SEARCH_INPUT_DEFAULT_PLACEHOLDER}
        className="h-12 w-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white pl-11 pr-4  placeholder-gray-500 focus:ring-0 rounded-md outline-none shadow-sm border border-transparent focus:border-black dark:focus:border-white"
        type="search"
        onChange={(e) => setQuery(e.target.value.trim())}
      ></input>
    </div>
  );
};

export default SearchInput;
