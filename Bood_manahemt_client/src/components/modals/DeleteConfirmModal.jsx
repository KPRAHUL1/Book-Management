import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useBookContext } from '../../contexts/BookContext';
import { useDeleteBook } from '../../hooks/useBooks';
import clsx from 'clsx';

const DeleteConfirmModal = () => {
  const { state, dispatch } = useBookContext();
  const { isDeleteModalOpen, selectedBook } = state;
  const deleteBookMutation = useDeleteBook();

  const closeModal = () => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
  };

  const handleDelete = async () => {
    if (selectedBook) {
      try {
        await deleteBookMutation.mutateAsync(selectedBook.id);
        closeModal();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  if (!selectedBook) return null;

  return (
    <Transition appear show={isDeleteModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="ml-3 text-lg font-semibold leading-6 text-gray-900"
                    >
                      Delete Book
                    </Dialog.Title>
                  </div>
                  <button
                    type="button"
                    className="rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    onClick={closeModal}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to delete this book? This action cannot be undone.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-1">{selectedBook.title}</h4>
                    <p className="text-sm text-gray-600">by {selectedBook.author}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedBook.genre} • {selectedBook.publishedYear}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                    disabled={deleteBookMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteBookMutation.isPending}
                    className={clsx(
                      'px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200',
                      deleteBookMutation.isPending
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md'
                    )}
                  >
                    {deleteBookMutation.isPending ? 'Deleting...' : 'Delete Book'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteConfirmModal;