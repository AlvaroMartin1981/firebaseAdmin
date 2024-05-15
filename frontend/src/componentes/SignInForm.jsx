import React, { useState } from 'react';
import { auth } from '../config/Firebase';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            // Redireccionar al usuario a la página de inicio si el inicio de sesión es exitoso
            window.location.href = '/home';
        } catch (error) {
            setError(error.message);
            console.error('Error:', error.message);
        }
    }

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
                    <button type="submit">Login</button>
                </div>
            </form>
            <p>¿No estás registrado? <a href="/signup">Sign up</a></p>
            <button onClick={() => window.location.href = '/'}>Go Home</button>
        </div>
    );
}

export default SignInForm;
