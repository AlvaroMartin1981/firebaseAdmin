import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to sign in');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Guardamos el token en el localStorage
            navigate('/home');
        } catch (error) {
            setError(error.message);
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="sign-in-form">
            <h2>Sign In</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignIn}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Sign in</button>
                </div>
            </form>
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    );
};

export default SignInForm;
