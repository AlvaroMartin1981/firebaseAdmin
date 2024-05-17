const express = require('express');
const routerAxios = express.Router();
const getPokemon = require('../utils/getPokemon')

routerAxios.get('/cards', async (req, res) => {
    try {
        await getPokemon.fetchAndSavePokemonCards();
        res.status(200).send('Tarjetas de Pokémon guardadas exitosamente en Firestore.');
    } catch (error) {
        console.error('Error al obtener las tarjetas de Pokémon:', error.message);
        res.status(500).send('Error al obtener las tarjetas de Pokémon.');
    }
});

routerAxios.get('/sets', async (req, res) => {
    try {
        await getPokemon.fetchAndSaveSetDetails();
        res.status(200).send('Detalles de los sets de Pokémon guardados exitosamente en Firestore.');
    } catch (error) {
        console.error('Error al obtener los detalles de los sets de Pokémon:', error.message);
        res.status(500).send('Error al obtener los detalles de los sets de Pokémon.');
    }
});

routerAxios.get('/types', async (req, res) => {
    try {
        const types = await getPokemon.getAllTypes();
        res.status(200).json({ data: types });
    } catch (error) {
        console.error('Error al obtener los tipos de Pokémon:', error.message);
        res.status(500).send('Error al obtener los tipos de Pokémon.');
    }
});

routerAxios.get('/subtypes', async (req, res) => {
    try {
        const subtypes = await getPokemon.getAllSubtypes();
        res.status(200).json({ data: subtypes });
    } catch (error) {
        console.error('Error al obtener los subtipos de Pokémon:', error.message);
        res.status(500).send('Error al obtener los subtipos de Pokémon.');
    }
});

routerAxios.get('/supertypes', async (req, res) => {
    try {
        const supertypes = await getPokemon.getAllSuperTypes();
        res.status(200).json({ data: supertypes });
    } catch (error) {
        console.error('Error al obtener los supertipos de Pokémon:', error.message);
        res.status(500).send('Error al obtener los supertipos de Pokémon.');
    }
});

routerAxios.get('/rarities', async (req, res) => {
    try {
        const rarities = await getPokemon.getAllRarities();
        res.status(200).json({ data: rarities });
    } catch (error) {
        console.error('Error al obtener las rarezas de Pokémon:', error.message);
        res.status(500).send('Error al obtener las rarezas de Pokémon.');
    }
});

module.exports = routerAxios;
