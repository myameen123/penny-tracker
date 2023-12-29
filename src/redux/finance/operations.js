/**
 * Async Action Creators for Finance Operations
 *
 * @module FinanceAsyncActions
 */

// Importing necessary dependencies and operations
import { Notify } from "notiflix";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../session/operations";

/**
 * Async thunk to fetch transactions for a given user.
 *
 * @function
 * @name fetchTransactions
 * @param {string} userId - The unique identifier of the user.
 * @param {Object} thunkAPI - The Redux Toolkit thunk API.
 * @returns {Promise<Object>} A promise that resolves to the fetched transaction data.
 *
 * @throws {string} If an error occurs during the API call, the error message is thrown.
 *
 * @description This async thunk fetches transactions for a given user from the server.
 * The fetched data is stored in the Redux store upon success.
 *
 * @example
 * // Usage example:
 * dispatch(fetchTransactions("user123"));
 */
export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (userId, thunkAPI) => {
    try {
      const response = await instance.get(
        `/user/${userId}/transactions?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      // Rejecting the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to add a new transaction.
 *
 * @function
 * @name addTransaction
 * @param {Object} data - The data representing the new transaction.
 * @param {Object} thunkAPI - The Redux Toolkit thunk API.
 * @returns {Promise<Object>} A promise that resolves to the added transaction data.
 *
 * @throws {string} If an error occurs during the API call, the error message is thrown.
 *
 * @description This async thunk adds a new transaction to the server and displays a success notification.
 * The added transaction data is stored in the Redux store upon success.
 *
 * @example
 * // Usage example:
 * dispatch(addTransaction({ amount: 100, description: "Groceries" }));
 */
export const addTransaction = createAsyncThunk(
  "finance/addTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await instance.post("/transaction", data);
      // Displaying success notification
      Notify.success("Transaction added successfully.");
      return response.data;
    } catch (error) {
      // Rejecting the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to delete a transaction.
 *
 * @function
 * @name deleteTransaction
 * @param {string} transactionID - The unique identifier of the transaction to be deleted.
 * @param {Object} thunkAPI - The Redux Toolkit thunk API.
 * @returns {Promise<Object>} A promise that resolves to the deleted transaction data.
 *
 * @throws {string} If an error occurs during the API call, the error message is thrown.
 *
 * @description This async thunk deletes a transaction from the server and displays a success notification.
 * The deleted transaction data is removed from the Redux store upon success.
 *
 * @example
 * // Usage example:
 * dispatch(deleteTransaction("transaction123"));
 */
export const deleteTransaction = createAsyncThunk(
  "finance/deleteTransaction",
  async (transactionID, thunkAPI) => {
    try {
      const response = await instance.delete(`/transaction/${transactionID}`);
      // Displaying success notification
      Notify.success("Transaction deleted successfully.");
      return response.data;
    } catch (error) {
      // Rejecting the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to update a transaction.
 *
 * @function
 * @name updateTransaction
 * @param {Object} data - The data representing the updated transaction.
 * @param {Object} thunkAPI - The Redux Toolkit thunk API.
 * @returns {Promise<Object>} A promise that resolves to the updated transaction data.
 *
 * @throws {string} If an error occurs during the API call, the error message is thrown.
 *
 * @description This async thunk updates a transaction on the server and displays a success notification.
 * The updated transaction data is stored in the Redux store upon success.
 *
 * @example
 * // Usage example:
 * dispatch(updateTransaction({ transactionId: "transaction123", amount: 150 }));
 */
export const updateTransaction = createAsyncThunk(
  "finance/updateTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/transaction/${data.transactionId}`,
        data
      );
      // Displaying success notification
      Notify.success("Transaction updated successfully.");
      return response.data;
    } catch (error) {
      // Rejecting the promise with an error message
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Exporting the async action creators
export default {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};
