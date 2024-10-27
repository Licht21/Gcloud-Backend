const { nanoid } = require('nanoid');
const books = require('./books');

const addBookToBookShelf = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    });
    response.code(201);
    return response;
  }
};

const getAllBooks = (request, h) => {
  const { reading, finished, name } = request.query;
  if (reading === '1') {
    const readedBook = books.filter((book) => book.reading === true);
    const response = h.response({
      status: 'success',
      data: {
        books: readedBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    });
    response.code(200);
    return response;
  }

  if (reading === '0') {
    const unreadedBook = books.filter((book) => book.reading === false);
    const response = h.response({
      status: 'success',
      data: {
        books: unreadedBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    });
    response.code(200);
    return response;
  }

  if (finished === '1') {
    const finishedBook = books.filter((book) => book.finished === true);
    const response = h.response({
      status: 'success',
      data: {
        books: finishedBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    });
    response.code(200);
    return response;
  }

  if (finished === '0') {
    const unfinishedBook = books.filter((book) => book.finished === false);
    const response = h.response({
      status: 'success',
      data: {
        books: unfinishedBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    });
    response.code(200);
    return response;
  }

  if (name === 'Dicoding') {
    const dicodingBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: dicodingBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    });
    response.code(200);
    return response;
  }

  return {
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  };
};

const getBookById = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((book) => book.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  });
  response.code(404);
  return response;
};

const editBookById = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      });
      response.code(400);
      return response;
    }
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt

    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);
  return response;
};

module.exports = { addBookToBookShelf, getAllBooks, getBookById, editBookById, deleteBookById };
