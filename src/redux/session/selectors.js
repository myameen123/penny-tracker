/**
 * Session Selectors
 *
 * @module SessionSelectors
 */

/**
 * Selects the authentication state from the session slice in the Redux store.
 *
 * @function
 * @name selectIsAuth
 * @param {Object} state - The Redux store state.
 * @returns {boolean} The authentication state.
 *
 * @description This selector retrieves the authentication state from the session slice.
 *
 * @example
 * // Usage example:
 * const isAuth = selectIsAuth(store.getState());
 */
export const selectIsAuth = (state) => state.session.isAuth;

/**
 * Selects the user data from the session slice in the Redux store.
 *
 * @function
 * @name selectUser
 * @param {Object} state - The Redux store state.
 * @returns {Object | null} The user data.
 *
 * @description This selector retrieves the user data from the session slice.
 *
 * @example
 * // Usage example:
 * const user = selectUser(store.getState());
 */
export const selectUser = (state) => state.session.user;

/**
 * Selects the refreshing state from the session slice in the Redux store.
 *
 * @function
 * @name selectIsRefreshing
 * @param {Object} state - The Redux store state.
 * @returns {boolean} The refreshing state.
 *
 * @description This selector retrieves the refreshing state from the session slice.
 *
 * @example
 * // Usage example:
 * const isRefreshing = selectIsRefreshing(store.getState());
 */
export const selectIsRefreshing = (state) => state.session.isRefreshing;
