/**
 * Session Operations and Async Action Creators
 *
 * @module SessionOperations
 */

// Importing necessary dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";

/**
 * Axios instance for making API requests.
 *
 * @constant {Object} instance
 * @type {Object}
 * @property {Function} create - Axios create function.
 * @property {Object} defaults.headers.common - Default headers for the axios instance.
 */
export const instance = axios.create({
  baseURL: "https://wallet-app-18x3.onrender.com",
});

/**
 * Sets the Authorization header with the provided token.
 *
 * @function
 * @name setAuthHeader
 * @param {string} token - The authentication token.
 * @returns {void}
 *
 * @description This function sets the Authorization header for the axios instance.
 *
 * @example
 * // Usage example:
 * setAuthHeader("sampleAuthToken");
 */
const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

/**
 * Clears the Authorization header.
 *
 * @function
 * @name clearAuthHeader
 * @returns {void}
 *
 * @description This function clears the Authorization header for the axios instance.
 *
 * @example
 * // Usage example:
 * clearAuthHeader();
 */
const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

/**
 * Async thunk to register a new user.
 *
 * @function
 * @name register
 * @param {Object} credentials - The user registration credentials.
 * @param {Object} thunkAPI - The Redux Toolkit thunk API.
 * @returns {Promise<Object>} A promise that resolves to the registration response data.
 *
 * @throws {string} If registration fails, the error message is thrown.
 *
 * @description This async thunk registers a new user by making a POST request to the server.
 * It displays success or failure notifications based on the response.
 *
 * @example
 * // Usage example:
 * dispatch(register({ email: "user@example.com", password: "password123" }));
 */
export const register = createAsyncThunk(
  "session/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await instance.post("/user/register", credentials);
      Notify.success("Registration successful.");
      return response.data;
    } catch (error) {
      if (error.response.data.message === "Email in use") {
        Notify.failure("The provided email is already in use.");
      } else {
        Notify.failure("Registration failed.");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to log in a user.
 *
 * @function
 * @name login
 * @param {Object} credentials - The user login credentials.
 * @param {Object} thunkAPI - The Redux Toolkit thunk API.
 * @returns {Promise<Object>} A promise that resolves to the login response data.
 *
 * @throws {string} If login fails, the error message is thrown.
 *
 * @description This async thunk logs in a user by making a POST request to the server.
 * It sets the Authorization header and displays success or failure notifications based on the response.
 *
 * @example
 * // Usage example:
 * dispatch(login({ email: "user@example.com", password: "password123" }));
 */
export const login = createAsyncThunk(
  "session/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await instance.post("/user/login", credentials);
      setAuthHeader(response.data.data.token);
      Notify.success("Logged in successfully.");
      return response.data;
    } catch (error) {
      Notify.failure("Invalid email or password.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to log out a user.
 *
 * @function
 * @name logout
 * @param {undefined} _ - The empty payload.
 * @param {Object} thunkAPI - The Redux Toolkit thunk API.
 * @returns {Promise<void>} A promise that resolves after logging out successfully.
 *
 * @throws {string} If logout fails, the error message is thrown.
 *
 * @description This async thunk logs out a user by making a GET request to the server.
 * It clears the Authorization header and displays a success notification based on the response.
 *
 * @example
 * // Usage example:
 * dispatch(logout());
 */
export const logout = createAsyncThunk(
  "session/logout",
  async (_, thunkAPI) => {
    try {
      await instance.get("/user/logout");
      Notify.success("Logged out successfully.");
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to refresh user data.
 *
 * @function
 * @name refreshUser
 * @param {undefined} _ - The empty payload.
 * @param {Object} thunkAPI - The Redux Toolkit thunk API.
 * @returns {Promise<Object>} A promise that resolves to the refreshed user data.
 *
 * @throws {string} If refresh fails, the error message is thrown.
 *
 * @description This async thunk refreshes the user data by making a GET request to the server.
 * It sets the Authorization header and returns the refreshed user data on success.
 *
 * @example
 * // Usage example:
 * dispatch(refreshUser());
 */
export const refreshUser = createAsyncThunk(
  "session/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.session.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const response = await instance.get("/user/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
