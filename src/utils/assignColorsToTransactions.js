/**
 * Category Colors
 *
 * @constant {Object} categoryColors
 * @type {Object}
 * @property {string} Main expenses - Color for "Main expenses" category.
 * @property {string} Products - Color for "Products" category.
 * @property {string} Car - Color for "Car" category.
 * @property {string} Self care - Color for "Self care" category.
 * @property {string} Child care - Color for "Child care" category.
 * @property {string} Household products - Color for "Household products" category.
 * @property {string} Education - Color for "Education" category.
 * @property {string} Other expenses - Color for "Other expenses" category.
 * @property {string} Entertainment - Color for "Entertainment" category.
 * @property {string} Leisure - Color for "Leisure" category.
 *
 * @description This constant defines color codes for various expense categories.
 *
 * @example
 * // Usage example:
 * const mainExpensesColor = categoryColors["Main expenses"]; // "#fed057"
 */
export const categoryColors = {
  "Main expenses": "#fed057",
  Products: "#ffd8d0",
  Car: "rgba(253, 148, 152, 1)",
  "Self care": "rgba(197, 186, 255, 1)",
  "Child care": "#6e78e8",
  "Household products": "#4a56e2",
  Education: "#81e1ff",
  "Other expenses": "#00ad84",
  Entertainment: "#ff77a9",
  Leisure: "rgba(36, 204, 167, 1)",
};

/**
 * Assign Colors to Transactions
 *
 * @function
 * @name assignColorsToTransactions
 * @param {Array} transactions - The array of transactions.
 * @returns {Object} colors - An object mapping categories to their corresponding colors.
 *
 * @description This function assigns colors to transactions based on their categories.
 * It uses the predefined color codes from the categoryColors constant.
 *
 * @example
 * // Usage example:
 * const transactions = [{ category: "Products" }, { category: "Entertainment" }];
 * const transactionColors = assignColorsToTransactions(transactions);
 * // transactionColors: { "Products": "#ffd8d0", "Entertainment": "#ff77a9" }
 */
export const assignColorsToTransactions = (transactions) => {
  const colors = {};
  transactions.forEach((transaction) => {
    const { category } = transaction;
    if (category && categoryColors[category]) {
      colors[category] = categoryColors[category];
    }
  });
  return colors;
};
