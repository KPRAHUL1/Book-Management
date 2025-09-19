import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { useBookContext } from '../../contexts/BookContext';

const Header = () => {
  const { dispatch } = useBookContext();

  const handleAddBook = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BookHub</h1>
              <p className="text-sm text-gray-600">Management Dashboard</p>
            </div>
          </div>
          
          <button
            onClick={handleAddBook}
            className="inline-flex rounded-lg items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg+
             shadow-sm hover:shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;