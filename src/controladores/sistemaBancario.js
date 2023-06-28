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


    return res.status(201).json(aberturaConta);

}

const atualizarUsuarioConta = (req, res) => {
    const { numConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const validarConta = contas.find(conta => conta.numero === numConta);

    if (!validarConta) {
        const statusCode = res.status(404).json({ mensagem: 'O número da conta é inválido' });
        return statusCode;
    }

    if (!(nome && cpf && data_nascimento && telefone && email && senha)) {
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
        const statusCode = res.status(400).json({ mensagem: 'É necessário zerar o saldo antes de excluir a conta' });
        return statusCode;
    }

    contas = contas.filter(conta => conta !== buscarConta);


    return res.status(201).json({ mensagem: 'Conta excluída!' });

}

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        const statusCode = res.status(400).json({ mensagem: 'Informe o número da conta' });
        return statusCode;
    }

    const validarConta = contas.find(conta => conta.numero === numero_conta);

    if (!validarConta) {
        const statusCode = res.status(404).json({ mensagem: 'A conta informada não existe' })
        return statusCode;
    }

    if (!valor || valor < 0 || valor.length == 0) {
        const statusCode = res.status(400).json({ mensagem: 'Informe um valor para depósito' });
        return statusCode;
    }

    validarConta.saldo += valor;

    const deposito = {
        data: new Date(),
        numero_conta,
        valor
    }

    depositos.push(deposito);

    return res.status(200).json({ mensagem: 'Depósito realizado com sucesso!' })

}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) {
        const statusCode = res.status(400).json({ mensagem: 'Informe o número da conta' });
        return statusCode;
    }

    if (!valor || valor <= 0) {
        const statusCode = res.status(400).json({ mensagem: 'Informe um valor para saque' });
        return statusCode;
    } else if (valor > saldo) {
        const statusCode = res.status(400).json({ mensagem: 'Saldo insufiente' });
        return statusCode;
    }

    if (!senha) {
        const statusCode = res.status(400).json({ mensagem: 'Informe a senha da conta' });
        return statusCode;
    }

    const validarConta = contas.find(conta => conta.numero === numero_conta && conta.senha === senha);

    if (!validarConta) {
        const statusCode = res.status(404).json({ mensagem: 'A conta informada não existe' })
        return statusCode;
    }

    validarConta.saldo -= valor;

    const saques = {
        data: new Date(),
        numero_conta,
        valor
    }

    saques.push(sacar);

    return res.status(200).json({ mensagem: 'Saque realizado com sucesso!' })
}

const transferir = (req, res) => {
    const { numero_conta_origem, senha_origem, valor, numero_conta_destino } = req.body;

    if (!numero_conta_origem) {
        const statusCode = res.status(400).json({ mensagem: 'Informe o número da conta de origem' });
        return statusCode;
    }

    if (!senha_origem) {
        const statusCode = res.status(400).json({ mensagem: 'Informe a senha da conta de origem' });
        return statusCode;
    }

    if (!numero_conta_destino) {
        const statusCode = res.status(400).json({ mensagem: 'Informe o número da conta de destino' });
        return statusCode;
    }

    if (!valor || valor <= 0) {
        const statusCode = res.status(400).json({ mensagem: 'Informe um valor para saque' });
        return statusCode;
    } else if (valor > saldo) {
        const statusCode = res.status(400).json({ mensagem: 'Saldo insufiente' });
        return statusCode;
    }

    const origem = contas.find(conta => conta.id === numero_conta_origem);
    const destino = contas.find(conta => conta.id === numero_conta_destino);
    const validarSenha = contas.find(conta => conta.senha === senha_origem)

    if (!origem || !destino) {
        const statusCode = res.status(404).json({ mensagem: 'Conta não encontrada' });
        return statusCode;
    }

    if (!validarSenha) {
        const statusCode = res.status(404).json({ mensagem: 'A senha informada está incorreta' })
        return statusCode;
    }

    origem.saldo -= valor;
    destino.saldo += valor;

    const transferencias = {
        data: new Date(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(transferir);

    return res.status(200).json({ mensagem: 'Transferência realizada com sucesso!' })
}


module.exports = {
    listarContas,
    criarConta,
    atualizarUsuarioConta,
    excluirConta,
    depositar,
    sacar,
    transferir
}