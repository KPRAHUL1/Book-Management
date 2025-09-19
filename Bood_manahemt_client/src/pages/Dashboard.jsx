import React, { useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useBookContext } from '../contexts/BookContext';
import Header from '../components/layout/Header';
import SearchAndFilters from '../components/ui/SearchAndFilters';
import BookList from '../components/books/BookList';
import Pagination from '../components/ui/Pagination';
import BookModal from '../components/modals/BookModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';

const Dashboard = () => {
  const { state, dispatch } = useBookContext();
  const { currentPage, filters } = state;
  
  const { data } = useBooks(currentPage, filters.search, filters.genre, filters.status);

  useEffect(() => {
    if (data) {
      const totalPages = Math.ceil(data.total / 10);
      dispatch({
        type: 'SET_BOOKS',
        payload: { books: data.data, totalPages },
      });
    }
  }, [data, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Library</h1>
          <p className="text-gray-600">
            Manage your book collection with ease
          </p>
        </div>

        <SearchAndFilters />
        <BookList />
        
        {data && data.total > 10 && (
          <div className="mt-8">
            <Pagination totalItems={data.total} itemsPerPage={10} />
          </div>
        )}
      </main>

      <BookModal />
      <DeleteConfirmModal />
    </div>
  );
};

export default Dashboard;