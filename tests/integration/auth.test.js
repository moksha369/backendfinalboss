require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app'); // Importa a aplicação
const User = require('../../src/models/User');

// Antes de todos os testes, conecta num banco de teste (ou limpa o atual)
beforeAll(async () => {
  // Vamos conectar no banco definido no .env, mas idealmente seria um banco separado
  const connectDB = require('../../src/config/db');
  await connectDB();
});

// Depois de tudo, fecha a conexão para o teste não ficar rodando pra sempre
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Autenticação API', () => {
  // Limpa a tabela de usuários antes de cada teste para evitar erro de "email duplicado"
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('Deve registrar um novo usuário com sucesso', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'teste.jest@email.com',
        password: 'senha_segura_123'
      });

    // Espera que o status seja 201 (Created)
    expect(res.statusCode).toEqual(201);
    // Espera que tenha retornado o token
    expect(res.body.data).toHaveProperty('token');
  });

  it('Não deve registrar usuário com email inválido', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'email-ruim', // Email sem @
        password: '123'
      });

    // Espera erro 400 (Bad Request)
    expect(res.statusCode).toEqual(400);
  });
});