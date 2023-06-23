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

const excluirConta = (req, res) => {
    const { numConta } = req.params;

    const buscarConta = contas.find(conta => conta.numero === numConta);

    if (!buscarConta) {
        const statusCode = res.status(404).json({ mensagem: 'Conta inexistente!' });
        return statusCode;
    }

    if (buscarConta.saldo) {
        const statusCode = res.status(404).json({ mensagem: 'É necessário zerar o saldo antes de excluir a conta' });
        return statusCode;
    }

    contas = contas.filter(conta => conta !== buscarConta);


    return res.status(201).json({ mensagem: 'Conta excluída!' });

}

module.exports = {
    listarContas,
    criarConta,
    excluirConta
}