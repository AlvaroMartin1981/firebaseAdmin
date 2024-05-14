/*const axios = require('axios');
const admin = require('firebase-admin');

admin.initializeApp();

const apiKey = process.env.API_KEY;
const headers = {
    'X-Api-Key': apiKey
};

const getPokemon = {
    async fetchAndSavePokemonCards() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/cards', { headers });
            const cards = response.data.data;

            const db = admin.firestore();

            for (const card of cards) {
                console.log('Guardando tarjeta:', card.name);
                const cardData = {};

                // Recorrer todas las propiedades del objeto card
                for (const [key, value] of Object.entries(card)) {
                 // Verificar si el valor es undefined y asignar null si lo es
                    cardData[key] = value !== undefined ? value : null;
                }
                await db.collection('products').doc(card.id).set(cardData,
                    { merge: true, ignoreUndefinedProperties: true });
            }
            console.log('Tarjetas de Pokémon guardadas exitosamente en Firestore.');
        } catch (error) {
            console.error('Error al obtener las tarjetas de Pokémon:', error.message);
        }
    },
    async fetchAndSaveSetDetails() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/sets', { headers });
            const sets = response.data.data;
    
            const db = admin.firestore();
    
            for (const set of sets) {
                console.log('Guardando detalles del set:', set.name);
                const setData = {};
    
                // Recorrer todas las propiedades del objeto set
                for (const [key, value] of Object.entries(set)) {
                    // Verificar si el valor es undefined y asignar null si lo es
                    setData[key] = value !== undefined ? value : null;
                }
                await db.collection('sets').doc(set.id).set(setData,
                    { merge: true, ignoreUndefinedProperties: true });
            }
            console.log('Detalles de los sets de Pokémon guardados exitosamente en Firestore.');
        } catch (error) {
            console.error('Error al obtener los detalles de los sets de Pokémon:', error.message);
        }
    },
    async getAllTypes() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/types');
            const types = response.data.data;
            return types;
        } catch (error) {
            console.error('Error al obtener los tipos de Pokémon:', error.message);
            res.status(500).send('Error al obtener los tipos de Pokémon.');
        } 
    },
    async getAllSubtypes() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/subtypes');
            const subtypes = response.data.data;
            res.status(200).json({ data: subtypes });
        } catch (error) {
            console.error('Error al obtener los subtipos de Pokémon:', error.message);
            res.status(500).send('Error al obtener los subtipos de Pokémon.');
        }
    },
    async getAllSuperTypes(){
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/supertypes');
            const supertypes = response.data.data;
            res.status(200).json({ data: supertypes });
        } catch (error) {
            console.error('Error al obtener los supertipos de Pokémon:', error.message);
            res.status(500).send('Error al obtener los supertipos de Pokémon.');
        }
    },
    async getAllRarities() {
        try {
            const response = await axios.get('https://api.pokemontcg.io/v2/rarities');
            const rarities = response.data.data;
            res.status(200).json({ data: rarities });
        } catch (error) {
            console.error('Error al obtener las rarezas de Pokémon:', error.message);
            res.status(500).send('Error al obtener las rarezas de Pokémon.');
        }
    }




};

module.exports = getPokemon;*/
