const express = require('express');

const rotas = express();

rotas.get(`/contas`, listarContas);

rotas.post('/contas', criarConta);

rotas.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);

rotas.delete('/contas/:numeroConta', excluirConta);

rotas.post('/depositar', depositar);

rotas.post('/transacoes/sacar', sacar);

rotas.post('/transacoes/transferir', transferir);

rotas.get('/contas/saldo', saldo);

rotas.get('/contas/extrato', extrato);

module.exports = rotas;
