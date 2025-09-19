import React from 'react';
import { Edit, Trash2, Calendar, User, Tag } from 'lucide-react';
import { useBookContext } from '../../contexts/BookContext';
import clsx from 'clsx';

const BookCard = ({ book }) => {
  const { dispatch } = useBookContext();

  const handleEdit = () => {
    dispatch({ type: 'SET_SELECTED_BOOK', payload: book });
    dispatch({ type: 'OPEN_MODAL' });
  };

  const handleDelete = () => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: book });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
            {book.title}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2 text-gray-400" />
              <span className="truncate">{book.author}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Tag className="h-4 w-4 mr-2 text-gray-400" />
              <span className="truncate">{book.genre}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{book.publishedYear}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <span
              className={clsx(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                book.status === 'Available'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              )}
            >
              {book.status}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Edit book"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete book"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;