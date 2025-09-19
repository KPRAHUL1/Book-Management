import { http, routes } from './http';

export const bookService = {
  async getBooks(page = 1, limit = 10, search = '', genre = '', status = '') {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', String(limit));
    if (search) params.set('search', search);
    if (genre) params.set('genre', genre);
    if (status) params.set('status', status);
    return http.get(`${routes.books.base}?${params.toString()}`);
  },

  async createBook(data) {
    return http.post(routes.books.base, data);
  },

  async updateBook(id, data) {
    return http.put(routes.books.byId(id), data);
  },

  async deleteBook(id) {
    return http.delete(routes.books.byId(id));
  },
};

