/**
 * Fetch Currency Exchange Rates
 *
 * @async
 * @function
 * @name fetchCurrency
 * @param {string} query - The currency code to fetch exchange rates for.
 * @returns {Promise<Array>} transformedData - An array of objects containing buy and sale rates.
 * @throws {Error} If the network response is not ok.
 *
 * @description This function fetches currency exchange rates from the NBP API for the specified currency code.
 *
 * @example
 * // Usage example:
 * try {
 *   const usdExchangeRates = await fetchCurrency("USD");
 *   console.log(usdExchangeRates);
 *   // Output: [{ buy: 4.12, sale: 4.22 }, { buy: 4.15, sale: 4.25 }, ...]
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export const fetchCurrency = async (query) => {
  // Fetch exchange rates from the NBP API
  const response = await fetch(
    `https://api.nbp.pl/api/exchangerates/rates/c/${query}/last/`
  );

  // Check if the network response is ok
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  // Parse response data as JSON
  const data = await response.json();

  // Transform the data to extract buy and sale rates
  const transformedData = data.rates.map((rate) => {
    return {
      buy: rate.ask,
      sale: rate.bid,
    };
  });

  // Return the transformed data
  return transformedData;
};
