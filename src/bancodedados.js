module.exports = {
  banco: {
    nome: 'Cubos Bank',
    numero: '123',
    agencia: '0001',
    senha: 'Cubos123Bank'
  },
  contas: [
    {
      numero: "1",
      saldo: 0,
      usuario: {
        nome: "Foo Bar Novo",
        cpf: "6667788899",
        data_nascimento: "2000-07-04",
        telefone: "71999333547",
        email: "fobar42@email.com",
        senha: "12345"
      }
    },

    {
      numero: "2",
      saldo: 0,
      usuario: {
        nome: "Foo Bar Novo 2",
        cpf: "666427788899",
        data_nascimento: "2000-07-04",
        telefone: "71999333547",
        email: "fiobar42@email.com",
        senha: "12345"

      }
    }
  ],
  saques: [

  ],
  depositos: [
    {
      data: "2021-08-10 23:40:35",
      numero_conta: "1",
      valor: 10000
    }
  ],
  transferencias: [

  ]
}
