let { banco } = require('../bancodedados');

const validarSenha = (req, res, next) => {
    const { senhaBanco } = req.query;

    if (!senhaBanco) {
        statusCode = res.status(401).send('O campo senha não pode ficar vazio!')
        return statusCode;
    }

    if (senhaBanco !== banco.senha) {
        statusCode = res.status(401).send('Senha incorreta!');
        return statusCode;
    }

    return next();
}

module.exports = {
    validarSenha
}