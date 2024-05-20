import React, { createContext, useState, useEffect, useContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [cards, setCards] = useState([]);
    const [cardsByName, setCardsByName] = useState([]);
    const [sets, setSets] = useState([]);
    const [setsByName, setSetsByName] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Realizar una solicitud HTTP GET al backend
                const response = await fetch('http://localhost:8080/cards');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                
                setCards(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ cards, cardsByName, sets, setsByName }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
