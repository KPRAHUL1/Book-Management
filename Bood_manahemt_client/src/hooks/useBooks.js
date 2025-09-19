import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookService } from '../services/bookService';
import toast from 'react-hot-toast';

export const useBooks = (page, search, genre, status) => {
  return useQuery({
    queryKey: ['books', page, search, genre, status],
    queryFn: () => bookService.getBooks(page, 10, search, genre, status),
    keepPreviousData: true,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bookData) => bookService.createBook(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create book: ${error.message}`);
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => bookService.updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update book: ${error.message}`);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => bookService.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to delete book: ${error.message}`);
    },
  });
};