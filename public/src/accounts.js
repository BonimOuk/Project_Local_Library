function findAccountById(accounts, id) {
return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  const result = accounts.sort((lastNameA, lastNameB) =>
    lastNameA.name.last.toLowerCase() < lastNameB.name.last.toLowerCase()
      ? -1
      : 1
  );
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  const accountID = account.id;
  let total = 0;
  books.filter((book) =>
    book.borrows.find((borrow) => accountID === borrow.id && total++)
  );
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  const result = [];
  books.filter((book) => {
    book.borrows.map((borrow) => {
      if (!borrow.returned && borrow.id == account.id) {
        book.author = authors.find((author) => author.id == book.authorId);
        result.push(book);
      }
    });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
