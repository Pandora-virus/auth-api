# auth-api

API REST de autenticação com TypeScript, Express e JWT.

## Tecnologias

- Node.js + TypeScript
- Express
- JWT (jsonwebtoken)
- bcryptjs
- SQLite (better-sqlite3)

## Pré-requisitos

- Node.js v18+
- npm

## Instalação

```bash
git clone git@github.com:Pandora-virus/auth-api.git
cd auth-api
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

## Endpoints

### Cadastro
```
POST /auth/register
Content-Type: application/json

{
  "name": "Ana Paula",
  "email": "ana@email.com",
  "password": "123456"
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "ana@email.com",
  "password": "123456"
}
```

### Dados do usuário autenticado
```
GET /auth/me
Authorization: Bearer <token>
```

## Arquitetura

```
src/
├── controllers/    # Recebe requisição, chama service, devolve resposta
├── middlewares/    # Verificação de token JWT
├── repositories/   # Acesso ao banco de dados
├── routes/         # Definição das rotas
├── services/       # Regras de negócio
├── app.ts          # Configuração do Express
└── server.ts       # Inicialização do servidor

