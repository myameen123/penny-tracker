/**
 * Register Validation Schema
 *
 * @constant {Object} registerValidationSchema
 * @type {Object}
 * @property {Object} email - Validation rules for the email field.
 * @property {Object} password - Validation rules for the password field.
 * @property {Object} confirmPassword - Validation rules for the confirmPassword field.
 *
 * @description This Yup validation schema defines rules for validating user registration inputs.
 *
 * @example
 * // Usage example:
 * import { useFormik } from "formik";
 * import { registerValidationSchema } from "./path-to-this-file";
 *
 * const initialValues = { email: "", password: "", confirmPassword: "" };
 * const formik = useFormik({
 *   initialValues,
 *   validationSchema: registerValidationSchema,
 *   onSubmit: (values) => {
 *     // Handle form submission for user registration
 *   },
 * });
 */
import { object, string, ref } from "yup";

export const registerValidationSchema = object().shape({
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters")
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

/**
 * Login Validation Schema
 *
 * @constant {Object} loginValidationSchema
 * @type {Object}
 * @property {Object} email - Validation rules for the email field.
 * @property {Object} password - Validation rules for the password field.
 *
 * @description This Yup validation schema defines rules for validating user login inputs.
 *
 * @example
 * // Usage example:
 * import { useFormik } from "formik";
 * import { loginValidationSchema } from "./path-to-this-file";
 *
 * const initialValues = { email: "", password: "" };
 * const formik = useFormik({
 *   initialValues,
 *   validationSchema: loginValidationSchema,
 *   onSubmit: (values) => {
 *     // Handle form submission for user login
 *   },
 * });
 */
export const loginValidationSchema = object().shape({
  email: string().email("Invalid email address").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not exceed 12 characters")
    .required("Password is required"),
});
