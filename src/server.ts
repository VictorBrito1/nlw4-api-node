import 'reflect-metadata';
import express from 'express';
import './database';

const app = express();

app.get('/users', (request, response) => {
    return response.send('Teste');
});

app.listen(3333, () => console.log("Servidor rodando"));