function findAuthorById(authors, id) {
  const foundAuthor = authors.find((author) => author.id === id);
  return foundAuthor;
}

function findBookById(books, id) {
  const foundBook = books.find((book) => book.id === id);
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const returnedBooks = [];
  books.map((book) => {
    book.borrows[0].returned === false
      ? borrowedBooks.push(book)
      : returnedBooks.push(book);
  });

  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const borrowers = borrows.map(({ id, returned }) => {
    const account = accounts.find((account) => account.id === id);
    return { ...account, returned };
  });
  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
