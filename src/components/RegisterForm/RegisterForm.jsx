import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {registerValidationSchema} from "../../utils/yupValidationSchema";
import {register} from "../../redux/session/operations";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    const handleSubmit = async (values) => {
        const formData = {
            email: values.email,
            password: values.password,
        };
        try {
            await dispatch(register(formData)).unwrap();
            navigate("login", {replace: "true"})
        } catch (error) {
            console.error("Registration failure", error)
        }
    };

    return (
        <div className={styles.register}>
            <div className={styles.register__header}>
                <img src="/assets/icon-wallet.jpg" alt="PennyTracker"/>
                <h2 className={styles.h2}>PennyTracker</h2>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={registerValidationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className={styles.register__form}>
                        <div className={styles.field}>
                            <img
                                className={styles.email}
                                src="/assets/icon-email.svg"
                                alt="email icon"
                            />
                            <Field
                                className={styles.register__field}
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                autoComplete="email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                        <div className={styles.field}>
                            <img
                                className={styles.fieldimg}
                                src="/assets/icon-lock.svg"
                                alt="lock icon"
                            />
                            <Field
                                className={styles.register__field}
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="new-password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                        <div className={styles.field}>
                            <img
                                className={styles.fieldimg}
                                src="/assets/icon-lock.svg"
                                alt="lock"
                            />
                            <Field
                                className={styles.register__field}
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                autoComplete="new-password"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                        <button className={styles.register__signup} type="submit">
                            REGISTER
                        </button>
                        <Link to="/login">
                            <button className={styles.register__signin}>LOG IN</button>
                        </Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
export default RegisterForm;
