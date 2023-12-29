/**
 * Get Months for a Given Year from Transactions
 *
 * @function
 * @name getMonthsForYear
 * @param {string} year - The year for which to retrieve months.
 * @returns {Array} months - An array of month names for the specified year.
 *
 * @description This function retrieves the unique months for a given year from a list of transactions.
 * It utilizes the selectTransactions selector from the finance slice in the Redux store.
 *
 * @example
 * // Usage example:
 * const year = "2023";
 * const monthsForYear = getMonthsForYear(year);
 * console.log(monthsForYear);
 * // Output: ["January", "February", "March", ...]
 */
import { useSelector } from "react-redux";
import { selectTransactions } from "../redux/finance/selectors";

export const getMonthsForYear = (year) => {
  // Get transactions from the Redux store
  const transactions = useSelector(selectTransactions);

  // Array to store month numbers for the specified year
  let monthsAsNumbers = [];

  // Iterate through transactions to extract unique months for the specified year
  transactions.forEach((transaction) => {
    const yearOfTransaction = transaction.date.slice(6, 10);

    // Check if the transaction belongs to the specified year
    if (yearOfTransaction === year) {
      const month = transaction.date.slice(3, 5);

      // Add unique month numbers to the array
      if (!monthsAsNumbers.includes(month)) {
        monthsAsNumbers.push(month);
      }
    }
  });

  // Sort the array of month numbers
  monthsAsNumbers.sort();

  // Array to store month names
  let months = [];

  // Map month numbers to month names
  monthsAsNumbers.forEach((month) => {
    switch (month) {
      case "01":
        months.push("January");
        break;
      case "02":
        months.push("February");
        break;
      case "03":
        months.push("March");
        break;
      case "04":
        months.push("April");
        break;
      case "05":
        months.push("May");
        break;
      case "06":
        months.push("June");
        break;
      case "07":
        months.push("July");
        break;
      case "08":
        months.push("August");
        break;
      case "09":
        months.push("September");
        break;
      case "10":
        months.push("October");
        break;
      case "11":
        months.push("November");
        break;
      case "12":
        months.push("December");
        break;
      default:
        break;
    }
  });

  // Return the array of month names
  return months;
};
