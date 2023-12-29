/**
 * Redux Store Configuration
 *
 * @module ReduxStore
 */

// Importing necessary dependencies and operations
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { financeReducer } from "./finance/financeSlice";
import { sessionReducer } from "./session/sessionSlice";
import { globalReducer } from "./global/globalSlice";

/**
 * Redux Persist Configuration for the session slice.
 *
 * @constant {Object} sessionPersistConfig
 * @type {Object}
 * @property {string} key - The key under which the session slice will be stored.
 * @property {Object} storage - The storage engine to be used (localStorage in this case).
 * @property {Array} whitelist - An array of reducer state keys to be persisted.
 *
 * @description This configuration defines how the session slice should be persisted.
 *
 * @example
 * // Usage example:
 * const sessionPersistConfig = {
 *   key: "session",
 *   storage,
 *   whitelist: ["token"],
 * };
 */
const sessionPersistConfig = {
  key: "session",
  storage,
  whitelist: ["token"],
};

/**
 * Redux Store Configuration
 *
 * @constant {Object} store
 * @type {Object}
 * @property {Object} reducer - Combined reducer for the Redux store.
 * @property {Object} middleware - Middleware configuration for the Redux store.
 *
 * @description This configuration sets up the Redux store with persisted session state.
 *
 * @example
 * // Usage example:
 * import { store, persistor } from "./path-to-this-file";
 * // Use `store` for regular Redux store operations and `persistor` for persisted state.
 */
export const store = configureStore({
  reducer: {
    session: persistReducer(sessionPersistConfig, sessionReducer),
    finance: financeReducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/**
 * Redux Persistor
 *
 * @constant {Object} persistor
 * @type {Object}
 *
 * @description This persistor is used in conjunction with the Redux store to persist and rehydrate state.
 *
 * @example
 * // Usage example:
 * import { persistor } from "./path-to-this-file";
 * // Use `persistor` in conjunction with the Redux store for persisted state.
 */
export const persistor = persistStore(store);
