/**
 * Finance Slice: Redux Toolkit
 *
 * @module FinanceSlice
 */

// Importing necessary dependencies and operations
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./operations";
import { register, login, logout, refreshUser } from "../session/operations";

/**
 * Initial state for the finance slice.
 *
 * @typedef {Object} FinanceInitialState
 * @property {number} totalBalance - The total balance of the finance slice.
 * @property {Array} data - An array containing finance-related data.
 * @property {null | Error} error - The error state, if any.
 */

const initialState = {
  totalBalance: 0,
  data: [],
  error: null,
};

/**
 * Handler for rejected asynchronous actions.
 *
 * @function
 * @name handleRejected
 * @param {Object} state - The current state of the finance slice.
 * @param {Object} action - The Redux action object representing a rejected action.
 * @returns {void}
 * @description Sets the error state and displays an error toast.
 */

const handleRejected = (state, action) => {
  state.error = action.payload;
  toast.error(`${state.error}`);
};

/**
 * Redux Toolkit's createSlice for the finance slice.
 *
 * @constant {Object} financeSlice
 * @type {Object}
 * @property {string} name - The name of the finance slice.
 * @property {FinanceInitialState} initialState - The initial state of the finance slice.
 * @property {Object} extraReducers - Reducer extra reducers for handling asynchronous actions.
 */
const financeSlice = createSlice({
  name: "finance",

  // Initial state for the finance slice
  initialState,

  // Reducer extra reducers for handling asynchronous actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        // Handling successful fetchTransactions
        state.error = null;
        state.data = action.payload.data;
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        // Handling successful addTransaction
        state.error = null;
        state.data.push(action.payload.data);
        state.totalBalance = action.payload.userBalance;
      })
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        // Handling successful deleteTransaction
        state.error = null;
        const index = state.data.findIndex(
          (transaction) => transaction._id === action.payload.data._id
        );
        state.data.splice(index, 1);
        state.totalBalance = action.payload.userBalance;
      })
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        // Handling successful updateTransaction
        state.error = null;
        const index = state.data.findIndex(
          (transaction) => transaction._id === action.payload.data._id
        );
        state.data.splice(index, 1, action.payload.data);
        state.totalBalance = action.payload.userBalance;
      })
      .addCase(updateTransaction.rejected, handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        // Handling successful user registration
        state.totalBalance = action.payload.data.balance;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        // Handling successful user login
        state.totalBalance = action.payload.data.balance;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        // Handling successful user refresh
        state.totalBalance = action.payload.data.balance;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        // Handling successful user logout
        state.totalBalance = 0;
        state.data = [];
        state.error = null;
      });
  },
});

/**
 * Redux reducer for the finance slice.
 *
 * @constant {Object} financeReducer
 * @type {Object}
 * @property {Function} reducer - The reducer function.
 */
export const financeReducer = financeSlice.reducer;

// Exporting the finance reducer
export default financeSlice;
