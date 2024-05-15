import React, { useState } from 'react';
import { auth, firestore } from '../config/Firebase';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            // Crear un nuevo usuario con correo electrónico y contraseña
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Guardar el nombre del usuario en Firestore
            await firestore.collection('users').doc(user.uid).set({
                name: name
            });

            // Redireccionar al usuario a la página de inicio después de registrarse
            window.location.href = '/home';
        } catch (error) {
            setError(error.message);
            console.error('Error:', error.message);
        }
    }

    return (
        <div className="sign-up-form">
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Sign up</button>
                </div>
            </form>
            <button onClick={() => window.location.href = '/'}>Go Home</button>
        </div>
    );
}

export default SignUpForm;
