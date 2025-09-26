import React, { useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useBookContext } from '../../contexts/BookContext';
import { useCreateBook, useUpdateBook } from '../../hooks/useBooks';
import clsx from 'clsx';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').trim(),
  author: yup.string().required('Author is required').trim(),
  genre: yup.string().required('Genre is required'),
  publishedYear: yup
    .number()
    .required('Published year is required')
    .min(1000, 'Year must be at least 1000')
    .max(new Date().getFullYear(), `Year cannot be greater than ${new Date().getFullYear()}`),
  status: yup.string().oneOf(['Available', 'Issued'], 'Invalid status').required('Status is required'),
});

const BookModal = () => {
  const { state, dispatch } = useBookContext();
  const { isModalOpen, selectedBook } = state;
  
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  
  const isEditing = !!selectedBook;
  const isLoading = createBookMutation.isPending || updateBookMutation.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isModalOpen) {
      if (selectedBook) {
        // Editing mode - populate form with selected book data
        setValue('title', selectedBook.title);
        setValue('author', selectedBook.author);
        setValue('genre', selectedBook.genre);
        setValue('publishedYear', selectedBook.publishedYear);
        setValue('status', selectedBook.status);
      } else {
        // Add mode - reset form
        reset();
      }
    }
  }, [isModalOpen, selectedBook, setValue, reset]);

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    reset();
  };

  const onSubmit = async (data) => {
    try {
      if (isEditing && selectedBook) {
        await updateBookMutation.mutateAsync({ id: selectedBook.id, data });
      } else {
        await createBookMutation.mutateAsync(data);
      }
      closeModal();
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error('Error saving book:', error);
    }
  };

  const genres = [
    'Classic Literature',
    'Dystopian Fiction',
    'Romance',
    'Romance',
    'Coming-of-age',
    'Fantasy',
    'Gothic Romance',
    'Gothic Romance',
    'Gothic Literature',
    'Science Fiction',
    'Mystery',
    'Thriller',
    'Historical Fiction',
    'Biography',
    'Non-fiction',
  ];

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    {isEditing ? 'Edit Book' : 'Add New Book'}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    onClick={closeModal}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      {...register('title')}
                      className={clsx(
                        'block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-200',
                        errors.title
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      )}
                      placeholder="Enter book title"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Author *
                    </label>
                    <input
                      type="text"
                      id="author"
                      {...register('author')}
                      className={clsx(
                        'block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-200',
                        errors.author
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      )}
                      placeholder="Enter author name"
                    />
                    {errors.author && (
                      <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="genre"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Genre *
                    </label>
                    <select
                      id="genre"
                      {...register('genre')}
                      className={clsx(
                        'block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-200 bg-white',
                        errors.genre
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      )}
                    >
                      <option value="">Select a genre</option>
                      {genres.filter((g) => g !== 'Romance').map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                    {errors.genre && (
                      <p className="mt-1 text-sm text-red-600">{errors.genre.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="publishedYear"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Published Year *
                    </label>
                    <input
                      type="number"
                      id="publishedYear"
                      {...register('publishedYear')}
                      className={clsx(
                        'block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-200',
                        errors.publishedYear
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      )}
                      placeholder="e.g., 2023"
                      min={1000}
                      max={new Date().getFullYear()}
                    />
                    {errors.publishedYear && (
                      <p className="mt-1 text-sm text-red-600">{errors.publishedYear.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Status *
                    </label>
                    <select
                      id="status"
                      {...register('status')}
                      className={clsx(
                        'block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-200 bg-white',
                        errors.status
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      )}
                    >
                      <option value="">Select status</option>
                      <option value="Available">Available</option>
                      <option value="Issued">Issued</option>
                    </select>
                    {errors.status && (
                      <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={clsx(
                        'px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200',
                        isLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md'
                      )}
                    >
                      {isLoading ? 'Saving...' : isEditing ? 'Update Book' : 'Add Book'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookModal;