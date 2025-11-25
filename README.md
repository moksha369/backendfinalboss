# 🚀 Task Manager API

Uma API RESTful robusta e segura para gerenciamento de tarefas, desenvolvida com foco em escalabilidade, arquitetura limpa e testes automatizados.

Este projeto implementa um sistema completo de CRUD (Create, Read, Update, Delete) onde cada usuário tem acesso exclusivo às suas próprias tarefas, protegido por autenticação JWT.

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Como Rodar](#-como-rodar)
- [Testes Automatizados](#-testes-automatizados)
- [Documentação da API (Swagger)](#-documentação-da-api-swagger)

---

## ✨ Funcionalidades

- **Autenticação Segura:** Registro e Login de usuários com criptografia de senha (bcrypt) e tokens JWT.
- **Proteção de Rotas:** Middleware que blinda rotas privadas, exigindo token válido.
- **CRUD de Tarefas:** Criação, Listagem, Atualização e Remoção de tarefas.
- **Isolamento de Dados:** Um usuário não consegue visualizar ou editar tarefas de outro usuário.
- **Validação Robusta:** Uso de **Zod** para garantir que nenhum dado inválido entre no sistema.
- **Tratamento de Erros:** Middleware global para respostas de erro padronizadas e limpas.
- **Documentação Interativa:** Swagger UI para testar rotas diretamente no navegador.

---

## 🛠 Stack Tecnológico

- **Runtime:** Node.js
- **Framework:** Express.js
- **Banco de Dados:** MongoDB (Atlas Cloud)
- **ODM:** Mongoose
- **Validação:** Zod
- **Autenticação:** JSON Web Token (JWT) & BcryptJS
- **Testes:** Jest & Supertest
- **Doc:** Swagger (OpenAPI 3.0)

---

## 🏗 Arquitetura

O projeto segue os princípios de **Clean Architecture** e **Separation of Concerns** (Separação de Preocupações):

```text
src/
├── config/         # Configurações de Banco de Dados e Env
├── controllers/    # Camada de Interface (Lida com Req/Res)
├── middlewares/    # Interceptadores (Auth, Error Handling)
├── models/         # Schemas do Banco de Dados (Mongoose)
├── routes/         # Definição de Endpoints
├── utils/          # Validadores (Zod) e Classes Auxiliares
└── app.js          # Configuração do App Express