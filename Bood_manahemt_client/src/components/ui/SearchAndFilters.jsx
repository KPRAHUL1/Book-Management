import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useBookContext } from '../../contexts/BookContext';

const SearchAndFilters = () => {
  const { state, dispatch } = useBookContext();
  const { filters } = state;

  const genres = [
    'All Genres',
    'Classic Literature',
    'Dystopian Fiction',
    'Romance',
    'Coming-of-age',
    'Fantasy',
    'Gothic Romance',
    'Gothic Literature',
  ];

  const statuses = ['All Statuses', 'Available', 'Issued'];

  const handleSearchChange = (e) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { search: e.target.value },
    });
  };

  const handleGenreChange = (e) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { genre: e.target.value === 'All Genres' ? '' : e.target.value },
    });
  };

  const handleStatusChange = (e) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { status: e.target.value === 'All Statuses' ? '' : e.target.value },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search by title or author..."
              value={filters.search}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="min-w-0 flex-1 sm:flex-initial">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select
                id="genre"
                value={filters.genre || 'All Genres'}
                onChange={handleGenreChange}
                className="block w-full pl-10 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 appearance-none cursor-pointer"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="min-w-0 flex-1 sm:flex-initial">
            <select
              id="status"
              value={filters.status || 'All Statuses'}
              onChange={handleStatusChange}
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 appearance-none cursor-pointer"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;