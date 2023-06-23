let { contas, depositos, saques, transferencias } = require('../bancodedados');

const listarContas = (req, res) => {
    return res.status(200).json(contas);
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        const statusCode = res.status(422).json({ mensagem: 'Preencha todos os campos!' });
        return statusCode;
    }

    const numConta = contas.length + 1;

    const cadastrarCPF = contas.find(conta => conta.usuario.cpf === cpf);
    if (cadastrarCPF) {
        const statusCode = res.status(409).json({ mensagem: 'CPF já existente!' })
        return statusCode;
    }

    const cadastrarEmail = contas.find(conta => conta.usuario.email === email);
    if (cadastrarEmail) {
        const statusCode = res.status(409).json({ mensagem: 'Email já existente!' })
        return statusCode;

    }


    const aberturaConta = {
        numConta: numConta.toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(aberturaConta);

    if (aberturaConta) {
        return res.status(201).json(aberturaConta);
    } else {
        return res.status(404).json({ mensagem: 'Algo deu errado!' });
        //arrumar uma forma de colocar validação para o erro 400
    }



}

const atualizarUsuarioConta = (req, res) => {

}

module.exports = {
    listarContas,
    criarConta
}