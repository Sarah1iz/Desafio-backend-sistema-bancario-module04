const express = require('express');
let { listarContas, criarConta, excluirConta } = require('./controladores/sistemaBancario');
const { validarSenha } = require('./intermediarios/intermediarios');
const rotas = express();


rotas.get('/contas', validarSenha, listarContas);

rotas.post('/contas', criarConta);

//rotas.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);

rotas.delete('/contas/:numeroConta', excluirConta);

// rotas.post('/depositar', depositar);

// rotas.post('/transacoes/sacar', sacar);

// rotas.post('/transacoes/transferir', transferir);

// rotas.get('/contas/saldo', saldo);

// rotas.get('/contas/extrato', extrato);

module.exports = rotas;
