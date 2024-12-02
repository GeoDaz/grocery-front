import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div>
      <input type="text" placeholder="Search for groceries..." />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;