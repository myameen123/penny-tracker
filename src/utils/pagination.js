/**
 * Paginate Transactions
 *
 * @function
 * @name paginateTransactions
 * @param {number} page - The current page number.
 * @returns {Object} paginationData - An object containing paginated transactions and pagination information.
 * @property {number} paginationData.pages - The total number of pages after pagination.
 * @property {Array} paginationData.paginatedTransactions - An array of transactions for the current page.
 *
 * @description This function paginates an array of transactions into chunks of 7 transactions per page.
 * It returns an object containing the total number of pages and the transactions for the current page.
 * It utilizes the selectTransactions selector from the finance slice in the Redux store.
 *
 * @example
 * // Usage example:
 * const currentPage = 2;
 * const paginationResult = paginateTransactions(currentPage);
 * console.log(paginationResult);
 * // Output: { pages: 3, paginatedTransactions: [{...}, {...}, ...] }
 */
import { useSelector } from "react-redux";
import { selectTransactions } from "../redux/finance/selectors";

export const paginateTransactions = (page) => {
  // Get transactions from the Redux store
  const transactions = useSelector(selectTransactions);

  // Check if transactions are empty or not available
  if (!transactions || transactions.length === 0) {
    return {
      pages: 0,
      paginatedTransactions: [],
    };
  }

  // Calculate the total number of pages based on 7 transactions per page
  const length = transactions.length;
  const pages = Math.ceil(length / 7);

  // Determine the current page, ensuring it is within valid bounds
  let currentPage;
  if (!page) {
    currentPage = 1;
  } else if (page > pages) {
    currentPage = pages;
  } else {
    currentPage = page;
  }

  // Calculate the start and end indices for the current page
  let start = (currentPage - 1) * 7;
  let end = currentPage * 7;

  // Slice the transactions array to get transactions for the current page
  const paginatedTransactions = transactions.slice(start, end);

  // Return an object with pagination information
  const paginationData = {
    pages,
    paginatedTransactions,
  };
  return paginationData;
};
