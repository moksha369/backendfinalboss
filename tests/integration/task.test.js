require('dotenv').config(); // OBRIGATÓRIO: Carrega variáveis de ambiente
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const User = require('../../src/models/User');
const Task = require('../../src/models/Task');

// Configuração do Banco de Testes
beforeAll(async () => {
  const connectDB = require('../../src/config/db');
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Gerenciamento de Tarefas (CRUD)', () => {
  let token;

  // Antes de cada teste, limpa tudo e cria um usuário novo
  beforeEach(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});

    // 1. Cria usuário
    await request(app).post('/api/auth/register').send({
      email: 'user@tasks.com',
      password: 'password123'
    });

    // 2. Faz login para pegar o token
    const res = await request(app).post('/api/auth/login').send({
      email: 'user@tasks.com',
      password: 'password123'
    });

    token = res.body.data.token; // Salva o token para usar nos testes
  });

  it('Deve criar uma tarefa nova quando autenticado', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`) // Envia o Token
      .send({
        title: 'Estudar Testes de Integração',
        description: 'Usando Jest e Supertest'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.title).toBe('Estudar Testes de Integração');
  });

  it('NÃO deve criar tarefa sem estar logado (Sem Token)', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Tarefa Hacker' });

    expect(res.statusCode).toEqual(401); // Deve ser barrado
  });

  it('NÃO deve criar tarefa sem título (Validação)', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Esqueci o título' });

    expect(res.statusCode).toEqual(400); // Erro do Zod
  });

  it('Deve listar as tarefas do usuário', async () => {
    // Primeiro cria uma tarefa
    await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarefa 1' });

    // Depois lista
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });
});