import React from 'react';
import Card from "./Card";
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { products } = useProducts();
    const navigate = useNavigate();

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Products</a></li>
                        <li><a href="#">About us</a></li>
                    </ul>
                </nav>
                <div>
                    <input type="text" placeholder="Search..." />
                    <button onClick={() => navigate('/signin')}>Sign in</button>
                    <button onClick={() => navigate('/signup')}>Sign up</button>
                </div>
            </header>
            <main>
                {products.length > 0 ? (
                    products.map(product => (
                        <Card key={product.id} product={product} />
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </main>
            <footer>
                <p>Footer content goes here</p>
            </footer>
        </div>
    );
};

export default Home;
