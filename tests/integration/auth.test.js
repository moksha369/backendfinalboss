require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const User = require('../../src/models/User');

beforeAll(async () => {
  const connectDB = require('../../src/config/db');
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Autenticação API', () => {
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

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('token');
  });

  it('Não deve registrar usuário com email inválido', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'email-ruim', 
        password: '123'
      });

    expect(res.statusCode).toEqual(400);
  });
});