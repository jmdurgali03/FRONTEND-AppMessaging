import React, { useState } from "react";
import useForm from "../../../hooks/useForm.jsx";
import ENVIROMENT from "../../../utils/enviroment.js";
import "./RegisterScreen.css";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
    const { form_state, handleChangeInput } = useForm({
        username: "",
        email: "",
        password: "",
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        if (!form_state.email || !form_state.password) {
            setErrors("Complete all the fields to register.");
            return;
        }

        setIsLoading(true);
        setErrors('');
        setSuccessMessage('');

        try {
            const response = await fetch(`${ENVIROMENT.API_URL}/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form_state),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setSuccessMessage(data.message);
            } else {
                setErrors(data.message);
            }
        }

        catch (error) {
            console.log(error);
            setErrors("Error registering user.");
        }

        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h1>Welcome to App Messaging</h1>
            <div className="register-box">
                <h2 className="register-title">First of all, enter your email address</h2>
                <p className="register-subtitle">We suggest using the email address that you use at work.</p>

                {errors && <p className="error-message">{errors}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={form_state.username}
                            onChange={handleChangeInput}
                            placeholder="jdurgali03"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form_state.email}
                            onChange={handleChangeInput}
                            placeholder="name@work-email.com"
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={form_state.password}
                            onChange={handleChangeInput}
                            placeholder="password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>

                <div className="login-link">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;