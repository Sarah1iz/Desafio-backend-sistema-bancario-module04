const express = require('express');
let { listarContas, criarConta, atualizarUsuarioConta, excluirConta, depositar, sacar, transferir, saldo, extrato } = require('./controladores/sistemaBancario');
const { validarSenha } = require('./intermediarios/intermediarios');
const rotas = express();


rotas.get('/contas', validarSenha, listarContas);

rotas.post('/contas', criarConta);

rotas.put('/contas/:numConta/usuario', atualizarUsuarioConta);

rotas.delete('/contas/:numConta', excluirConta);

rotas.post('/transacoes/depositar', depositar);

rotas.post('/transacoes/sacar', sacar);

rotas.post('/transacoes/transferir', transferir);

rotas.get('/contas/saldo', saldo);

rotas.get('/contas/extrato', extrato);

module.exports = rotas;
