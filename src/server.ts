import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    return response.send('Teste');
});

app.listen(3333, () => console.log("Servidor rodando"));