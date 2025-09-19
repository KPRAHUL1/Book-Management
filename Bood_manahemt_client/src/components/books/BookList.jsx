import React from 'react';
import { useBooks } from '../../hooks/useBooks';
import { useBookContext } from '../../contexts/BookContext';
import BookCard from './BookCard';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import { AlertCircle } from 'lucide-react';

const BookList = () => {
  const { state } = useBookContext();
  const { currentPage, filters } = state;
  
  const { data, isLoading, error } = useBooks(
    currentPage,
    filters.search,
    filters.genre,
    filters.status
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading books</h3>
          <p className="mt-1 text-sm text-gray-500">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.712-3.714M14 40v-4a9.971 9.971 0 01.712-3.714m0 0A9.973 9.973 0 0118 32a9.973 9.973 0 013.288 3.286m0 0A9.971 9.971 0 0122 40v-4a9.971 9.971 0 00-.712-3.714"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-500">
            {filters.search || filters.genre || filters.status
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first book.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;