import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  books: [],
  currentPage: 1,
  totalPages: 1,
  filters: {
    search: '',
    genre: '',
    status: '',
  },
  selectedBook: null,
  isModalOpen: false,
  isDeleteModalOpen: false,
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload.books,
        totalPages: action.payload.totalPages,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1, // Reset to first page when filtering
      };
    case 'SET_SELECTED_BOOK':
      return {
        ...state,
        selectedBook: action.payload,
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        selectedBook: null,
      };
    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        isDeleteModalOpen: true,
        selectedBook: action.payload,
      };
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        isDeleteModalOpen: false,
        selectedBook: null,
      };
    default:
      return state;
  }
};

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};