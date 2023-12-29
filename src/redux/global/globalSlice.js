/**
 * Global Slice: Redux Toolkit
 *
 * @module GlobalSlice
 */

// Importing necessary dependencies
import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the global slice.
 *
 * @typedef {Object} GlobalInitialState
 * @property {boolean} isLoading - Flag indicating whether the application is in a loading state.
 * @property {boolean} isModalLogoutOpen - Flag indicating whether the logout modal is open.
 * @property {boolean} isModalAddTransactionOpen - Flag indicating whether the add transaction modal is open.
 * @property {boolean} isModalEditTransactionOpen - Flag indicating whether the edit transaction modal is open.
 * @property {null | string} transactionId - The unique identifier of the selected transaction.
 */

const initialState = {
  isLoading: false,
  isModalLogoutOpen: false,
  isModalAddTransactionOpen: false,
  isModalEditTransactionOpen: false,
  transactionId: null,
};

/**
 * Redux Toolkit's createSlice for the global slice.
 *
 * @constant {Object} globalSlice
 * @type {Object}
 * @property {string} name - The name of the global slice.
 * @property {GlobalInitialState} initialState - The initial state of the global slice.
 * @property {Object} reducers - Redux action creators for updating the global state.
 */
const globalSlice = createSlice({
  name: "global",

  // Initial state for the global slice
  initialState,

  // Redux action creators for updating the global state
  reducers: {
    /**
     * Sets the loading state.
     *
     * @function
     * @name setIsLoading
     * @param {Object} state - The current state of the global slice.
     * @param {Object} action - The Redux action object.
     * @param {boolean} action.payload - The new loading state.
     * @returns {void}
     *
     * @description This action creator sets the loading state in the global slice.
     *
     * @example
     * // Usage example:
     * dispatch(setIsLoading(true));
     */
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    /**
     * Sets the state of the logout modal.
     *
     * @function
     * @name setIsModalLogoutOpen
     * @param {Object} state - The current state of the global slice.
     * @param {Object} action - The Redux action object.
     * @param {boolean} action.payload - The new state of the logout modal.
     * @returns {void}
     *
     * @description This action creator sets the state of the logout modal in the global slice.
     *
     * @example
     * // Usage example:
     * dispatch(setIsModalLogoutOpen(true));
     */
    setIsModalLogoutOpen(state, action) {
      state.isModalLogoutOpen = action.payload;
    },

    /**
     * Sets the state of the add transaction modal.
     *
     * @function
     * @name setIsModalAddTransactionOpen
     * @param {Object} state - The current state of the global slice.
     * @param {Object} action - The Redux action object.
     * @param {boolean} action.payload - The new state of the add transaction modal.
     * @returns {void}
     *
     * @description This action creator sets the state of the add transaction modal in the global slice.
     *
     * @example
     * // Usage example:
     * dispatch(setIsModalAddTransactionOpen(true));
     */
    setIsModalAddTransactionOpen(state, action) {
      state.isModalAddTransactionOpen = action.payload;
    },

    /**
     * Sets the state of the edit transaction modal.
     *
     * @function
     * @name setIsModalEditTransactionOpen
     * @param {Object} state - The current state of the global slice.
     * @param {Object} action - The Redux action object.
     * @param {boolean} action.payload - The new state of the edit transaction modal.
     * @returns {void}
     *
     * @description This action creator sets the state of the edit transaction modal in the global slice.
     *
     * @example
     * // Usage example:
     * dispatch(setIsModalEditTransactionOpen(true));
     */
    setIsModalEditTransactionOpen(state, action) {
      state.isModalEditTransactionOpen = action.payload;
    },

    /**
     * Sets the selected transaction's unique identifier.
     *
     * @function
     * @name setTransactionId
     * @param {Object} state - The current state of the global slice.
     * @param {Object} action - The Redux action object.
     * @param {null | string} action.payload - The unique identifier of the selected transaction.
     * @returns {void}
     *
     * @description This action creator sets the unique identifier of the selected transaction in the global slice.
     *
     * @example
     * // Usage example:
     * dispatch(setTransactionId("transaction123"));
     */
    setTransactionId(state, action) {
      state.transactionId = action.payload;
    },
  },
});

// Exporting Redux action creators and reducer for the global slice
export const {
  setIsLoading,
  setIsModalLogoutOpen,
  setIsModalAddTransactionOpen,
  setIsModalEditTransactionOpen,
  setTransactionId,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
