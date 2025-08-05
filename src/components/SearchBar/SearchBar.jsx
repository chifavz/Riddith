import React, { useState, useEffect } from 'react';

const subreddits = ['popular', 'news', 'gaming', 'funny', 'technology'];

export default function SearchBar({ onSearch, onFilterChange }) {
  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('popular');

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(term);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [term, onSearch]);

  // Call onFilterChange when filter changes
  useEffect(() => {
    onFilterChange(filter);
  }, [filter, onFilterChange]);

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="search"
        placeholder="Search posts..."
        value={term}
        onChange={e => setTerm(e.target.value)}
        style={{ flexGrow: 1, padding: '8px' }}
      />

      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ padding: '8px' }}
      >
        {subreddits.map(sub => (
          <option key={sub} value={sub}>
            r/{sub}
          </option>
        ))}
      </select>
    </div>
  );
}

