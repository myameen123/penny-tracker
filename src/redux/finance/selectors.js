/**
 * Finance Selectors
 *
 * @module FinanceSelectors
 */

/**
 * Selects the transactions data from the finance slice in the Redux store.
 *
 * @function
 * @name selectTransactions
 * @param {Object} state - The Redux store state.
 * @returns {Array} An array of transactions.
 *
 * @description This selector retrieves the transactions data from the finance slice.
 * It is used to access the list of transactions in the Redux store.
 *
 * @example
 * // Usage example:
 * const transactions = selectTransactions(store.getState());
 */

export const selectTransactions = (state) => state.finance.data;
/**
 * Selects the unique months present in the transactions data.
 *
 * @function
 * @name selectTransactionsMonths
 * @param {Object} state - The Redux store state.
 * @returns {Array} An array of month names.
 *
 * @description This selector calculates and returns an array of unique month names
 * extracted from the transaction data present in the Redux store.
 *
 * @example
 * // Usage example:
 * const months = selectTransactionsMonths(store.getState());
 */

export const selectTransactionsMonths = (state) => {
  const transactions = selectTransactions(state);

  let monthsAsNumbers = [];

  transactions.map((transaction) => {
    const month = transaction.date.slice(3, 5);
    if (!monthsAsNumbers.includes(month)) {
      monthsAsNumbers.push(month);
    }
  });

  monthsAsNumbers.sort();

  let months = [];

  monthsAsNumbers.map((month) => {
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

  return months;
};

/**
 * Selects the unique years present in the transactions data.
 *
 * @function
 * @name selectTransactionsYears
 * @param {Object} state - The Redux store state.
 * @returns {Array} An array of unique years.
 *
 * @description This selector calculates and returns an array of unique years
 * extracted from the transaction data present in the Redux store.
 *
 * @example
 * // Usage example:
 * const years = selectTransactionsYears(store.getState());
 */

export const selectTransactionsYears = (state) => {
  const transactions = selectTransactions(state);

  let years = [];

  transactions.map((transaction) => {
    const year = transaction.date.slice(6, 10);
    if (!years.includes(year)) {
      years.push(year);
    }
  });

  years.sort();

  return years;
};

/**
 * Selects the unique categories present in the transactions data.
 *
 * @function
 * @name selectTransactionsCategories
 * @param {Object} state - The Redux store state.
 * @returns {Array} An array of unique transaction categories.
 *
 * @description This selector retrieves and returns an array of unique transaction categories
 * extracted from the transaction data present in the Redux store.
 *
 * @example
 * // Usage example:
 * const categories = selectTransactionsCategories(store.getState());
 */

export const selectTransactionsCategories = (state) => {
  const transactions = selectTransactions(state);

  let categories = [];

  transactions.forEach((transaction) => categories.push(transaction.category));

  return categories;
};

/**
 * Selects a summary of transaction categories, distinguishing between income and expenses.
 *
 * @function
 * @name selectTransactionsCategoriesSummary
 * @param {Object} state - The Redux store state.
 * @returns {Object} An object containing the summary of income and expense categories.
 *
 * @description This selector calculates and returns a summary of income and expense categories
 * based on the transaction data present in the Redux store.
 *
 * @example
 * // Usage example:
 * const categoriesSummary = selectTransactionsCategoriesSummary(store.getState());
 */

export const selectTransactionsCategoriesSummary = (state) => {
  const transactions = selectTransactions(state);

  let categoriesSummary = {
    expense: 0,
    income: 0,
  };

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      categoriesSummary.income + transaction.amount;
    } else {
      categoriesSummary.expense + transaction.amount;
    }
  });

  return categoriesSummary;
};

/**
 * Selects the total balance from the finance slice in the Redux store.
 *
 * @function
 * @name selectBalance
 * @param {Object} state - The Redux store state.
 * @returns {number} The total balance.
 *
 * @description This selector retrieves and returns the total balance
 * from the finance slice in the Redux store.
 *
 * @example
 * // Usage example:
 * const balance = selectBalance(store.getState());
 */

export const selectBalance = (state) => state.finance.totalBalance;
