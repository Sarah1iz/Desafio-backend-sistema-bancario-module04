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
    const { numConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const validarConta = contas.find(conta => conta.numero === numConta);

    if (!validarConta) {
        const statusCode = res.status(404).json({ mensagem: 'O número da conta é inválido' });
        return statusCode;
    }

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        const statusCode = res.status(404).json({ mensagem: 'É necessário preencher pelo menos um campo' });
        return statusCode;
    }

    const validarCPF = contas.find(cpfBody => cpfBody.usuario.cpf === cpf);

    if (validarCPF) {
        const statusCode = res.status(404).json({ mensagem: 'CPF já cadastrado' });
        return statusCode;
    }


    const validarEmail = contas.find(emailBody => emailBody.usuario.email === email);

    if (validarEmail) {
        const statusCode = res.status(404).json({ mensagem: 'Email já cadastrado' });
        return statusCode;
    }

    validarConta.usuario.nome = nome ?? validarConta.usuario.nome;
    validarConta.usuario.cpf = cpf ?? validarConta.usuario.cpf;
    validarConta.usuario.data_nascimento = data_nascimento ?? validarConta.usuario.data_nascimento;
    validarConta.usuario.telefone = telefone ?? validarConta.usuario.telefone;
    validarConta.usuario.email = email ?? validarConta.usuario.email;
    validarConta.usuario.senha = senha ?? validarConta.usuario.senha;

    return res.status(204).json({ mensagem: 'Usuário atualizado com sucesso' });


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
    atualizarUsuarioConta,
    excluirConta
}