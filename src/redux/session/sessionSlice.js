/**
 * Session Slice: Redux Toolkit
 *
 * @module SessionSlice
 */

// Importing necessary dependencies and operations
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { register, login, logout, refreshUser } from "./operations";

/**
 * Handler for rejected asynchronous actions.
 *
 * @function
 * @name handleRejected
 * @param {Object} state - The current state of the session slice.
 * @param {Object} action - The Redux action object.
 * @returns {void}
 *
 * @description This handler sets the error state and displays an error toast notification.
 *
 * @example
 * // Usage example:
 * handleRejected(state, { payload: "An error occurred." });
 */
const handleRejected = (state, action) => {
  state.error = action.payload;
  toast.error(`${state.error}`);
};

/**
 * Initial state for the session slice.
 *
 * @typedef {Object} SessionInitialState
 * @property {boolean} isAuth - Flag indicating whether the user is authenticated.
 * @property {boolean} isRefreshing - Flag indicating whether user data is being refreshed.
 * @property {null | string} error - The error message.
 * @property {null | string} token - The authentication token.
 * @property {null | Object} user - The user data.
 */

const initialState = {
  isAuth: false,
  isRefreshing: false,
  error: null,
  token: null,
  user: null,
};

/**
 * Redux Toolkit's createSlice for the session slice.
 *
 * @constant {Object} sessionSlice
 * @type {Object}
 * @property {string} name - The name of the session slice.
 * @property {SessionInitialState} initialState - The initial state of the session slice.
 * @property {Object} extraReducers - Redux reducers for handling asynchronous actions.
 */
const sessionSlice = createSlice({
  name: "session",

  // Initial state for the session slice
  initialState,

  // Redux reducers for handling asynchronous actions
  extraReducers: (builder) => {
    builder
      /**
       * Handles successful user registration.
       *
       * @function
       * @name register.fulfilled
       * @param {Object} state - The current state of the session slice.
       * @param {Object} action - The Redux action object.
       * @returns {void}
       *
       * @description This reducer sets the user data and clears the error on successful registration.
       *
       * @example
       * // Usage example:
       * dispatch(register.fulfilled({ data: { email: "user@example.com", _id: "123" } }));
       */
      .addCase(register.fulfilled, (state, action) => {
        state.user = {
          email: action.payload.data.email,
          id: action.payload.data._id,
        };
        state.error = null;
      })

      /**
       * Handles rejected user registration.
       *
       * @function
       * @name register.rejected
       * @param {Object} state - The current state of the session slice.
       * @param {Object} action - The Redux action object.
       * @returns {void}
       *
       * @description This reducer handles rejected user registration by calling the handleRejected function.
       *
       * @example
       * // Usage example:
       * dispatch(register.rejected({ payload: "Email in use" }));
       */
      .addCase(register.rejected, handleRejected)

      // Similar reducers for login, logout, and refreshUser

      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.data.ID,
          email: action.payload.data.email,
        };
        state.token = action.payload.data.token;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.isRefreshing = false;
        state.error = null;
        state.token = null;
        state.user = null;
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.data._id,
          email: action.payload.data.email,
        };
        state.token = action.payload.data.token;
        state.isAuth = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

// Exporting Redux reducer for the session slice
export const sessionReducer = sessionSlice.reducer;
