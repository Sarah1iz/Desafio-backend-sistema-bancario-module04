let { contas, depositos, saques, transferencias } = require('../bancodedados');

const listarContas = (req, res) => {
    return res.status(200).json(contas);
}


module.exports = {
    listarContas
}