import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext.jsx'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useForm from '../../../hooks/useForm.jsx';
import ENVIROMENT from '../../../utils/enviroment.js';
import './LoginScreen.css'

const LoginScreen = () => {
    const { login, isAuthenticated } = useContext(AuthContext);
    const { form_state, handleChangeInput } = useForm({ email: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const verified = searchParams.get('verified');

        if (verified === 'true') {
            setSuccessMessage('Email verified successfully!')
        }
    }, [searchParams]);

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!form_state.email || !form_state.password) {
            setError('Complete all the fields to log in.');
            return
        }

        try {
            const response = await fetch(`${ENVIROMENT.API_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form_state.email,
                    password: form_state.password
                })
            });

            const data = await response.json();
            console.log('API response: ', data);

            if (!response.ok) {
                throw new Error(data.message || 'Error logging in');
            }

            if (!data.data || !data.data.access_token) {
                throw new Error(data.message);
            }

            localStorage.setItem('token', data.data.access_token);
            navigate('/home');
        }

        catch (error) {
            setError(error.message || 'Error logging in');
        }
    }

    return (
        <div className='login-container'>
            <h1>Welcome to App Messaging</h1>
            <div className='login-box'>
                <h2 className='login-title'>Log in!</h2>
                <p className='login-subtitle'>Log in to continue to enjoy efficient communication</p>

                {successMessage && <p className='login-success-message'>{successMessage}</p>}
                {error && <p className='login-error-message'>{error}</p>}

                <form className='login-form' onSubmit={handleSubmitForm}>
                    <div className='login-input'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='juandurgali@gmail.com'
                            value={form_state.email}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className='login-input'>
                        <label htmlFor="passowrd">Password:</label>
                        <input
                            type="password"
                            name='password'
                            id='password'
                            placeholder='password'
                            value={form_state.password}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <button type='submit' className='login-button'>Continue</button>
                </form>

                <div className='register-link'>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen