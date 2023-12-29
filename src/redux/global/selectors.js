/**
 * Global Selectors
 *
 * @module GlobalSelectors
 */

/**
 * Selects the loading state from the global slice in the Redux store.
 *
 * @function
 * @name selectIsLoading
 * @param {Object} state - The Redux store state.
 * @returns {boolean} The loading state.
 *
 * @description This selector retrieves the loading state from the global slice.
 *
 * @example
 * // Usage example:
 * const isLoading = selectIsLoading(store.getState());
 */
export const selectIsLoading = (state) => state.global.isLoading;

/**
 * Selects the state of the logout modal from the global slice in the Redux store.
 *
 * @function
 * @name selectIsModalLogoutOpen
 * @param {Object} state - The Redux store state.
 * @returns {boolean} The state of the logout modal.
 *
 * @description This selector retrieves the state of the logout modal from the global slice.
 *
 * @example
 * // Usage example:
 * const isModalLogoutOpen = selectIsModalLogoutOpen(store.getState());
 */
export const selectIsModalLogoutOpen = (state) =>
  state.global.isModalLogoutOpen;

/**
 * Selects the state of the add transaction modal from the global slice in the Redux store.
 *
 * @function
 * @name selectIsModalAddTransactionOpen
 * @param {Object} state - The Redux store state.
 * @returns {boolean} The state of the add transaction modal.
 *
 * @description This selector retrieves the state of the add transaction modal from the global slice.
 *
 * @example
 * // Usage example:
 * const isModalAddTransactionOpen = selectIsModalAddTransactionOpen(store.getState());
 */
export const selectIsModalAddTransactionOpen = (state) =>
  state.global.isModalAddTransactionOpen;

/**
 * Selects the state of the edit transaction modal from the global slice in the Redux store.
 *
 * @function
 * @name selectIsModalEditTransactionOpen
 * @param {Object} state - The Redux store state.
 * @returns {boolean} The state of the edit transaction modal.
 *
 * @description This selector retrieves the state of the edit transaction modal from the global slice.
 *
 * @example
 * // Usage example:
 * const isModalEditTransactionOpen = selectIsModalEditTransactionOpen(store.getState());
 */
export const selectIsModalEditTransactionOpen = (state) =>
  state.global.isModalEditTransactionOpen;

/**
 * Selects the unique identifier of the selected transaction from the global slice in the Redux store.
 *
 * @function
 * @name selectTransactionId
 * @param {Object} state - The Redux store state.
 * @returns {null | string} The unique identifier of the selected transaction.
 *
 * @description This selector retrieves the unique identifier of the selected transaction from the global slice.
 *
 * @example
 * // Usage example:
 * const transactionId = selectTransactionId(store.getState());
 */
export const selectTransactionId = (state) => state.global.transactionId;
