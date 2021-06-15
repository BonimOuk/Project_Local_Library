function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let found = books.filter((book) => book.borrows[0].returned === false);
  return found.length;
}

function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const result = [];
  bookGenres.map((genre) => {
    const genreLocation = result.findIndex((element) => element.name === genre);
    if (genreLocation >= 0) {
      result[genreLocation].count = result[genreLocation].count + 1;
    } else {
      result.push({ name: genre, count: 1 });
    }
  });
  result.sort((a, b) => b.count - a.count);
  if (result.length > 5) {
    return result.slice(0, 5);
  }
  return result;
}

function getMostPopularBooks(books) {
  let result = [];
  const borrows = books.reduce((acc, book) => {
    result.push({ name: book.title, count: book.borrows.length });
  }, []);
  return mostPopular(result);
}

// This getAuthorCount is the helper function
function getAuthorCount(books, id) {
  let result = books.filter((data) => data.authorId === id);
  let countBooks = 0;
  result.forEach((item) => {
    countBooks += item.borrows.filter((borrow) => borrow.returned).length + 1;
  });
  return countBooks;
}
function getMostPopularAuthors(books, authors) {
  authorsMap = authors.map((author) => ({
    name: author.name.first + " " + author.name.last,
    count: getAuthorCount(books, author.id),
  }));
  return mostPopular(authorsMap);
}

// This mostPopular function is helper function
function mostPopular(books) {
  let result = books
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

