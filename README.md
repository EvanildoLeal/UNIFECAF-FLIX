🎬 UNIFECAF FLIX API
https://img.shields.io/badge/Node.js-18+-green
https://img.shields.io/badge/Express-5.0-blue
https://img.shields.io/badge/MySQL-8.0-orange
https://img.shields.io/badge/Prisma-ORM-purple
https://img.shields.io/badge/REST-API-lightgrey

Uma API RESTful moderna para gerenciamento de catálogo de filmes, desenvolvida como projeto acadêmico para a disciplina de Web Programming for Back End.

📋 Índice
Visão Geral

Funcionalidades

Tecnologias

Arquitetura

Instalação

Configuração

Endpoints

Exemplos de Uso

Estrutura do Projeto

Desenvolvimento

Contribuição

Licença

🎯 Visão Geral
A UniFECAF Flix API é uma solução backend completa para plataformas de streaming, oferecendo operações CRUD robustas, filtros avançados e uma arquitetura escalável seguindo as melhores práticas de desenvolvimento moderno.

✨ Funcionalidades
✅ CRUD Completo - Create, Read, Update e Delete de filmes

🔍 Busca Avançada - Filtro por título, diretor, sinopse e gênero

🏗️ Arquitetura MVC - Separação clara de responsabilidades

🌐 RESTful - Endpoints semânticos e status HTTP apropriados

🛡️ Validação de Dados - Entradas validadas e sanitizadas

📊 Respostas Padronizadas - JSON consistente com metadados

💾 Persistência Robusta - MySQL com Prisma ORM

🛠️ Tecnologias
Tecnologia	Versão	Propósito
Node.js	18+	Runtime JavaScript
Express.js	5.0	Framework Web
MySQL	8.0	Banco de Dados Relacional
Prisma	6.0	ORM Type-Safe
Dotenv	16.0	Variáveis de Ambiente
🏗️ Arquitetura
Padrão MVC Implementado
text
📦 UNIFECAF-FLIX
├── 🎮 Controller (controllerFilme.js)
│   └── Lógica de negócio e orquestração
├── 💾 Model (filmeDAO.js) 
│   └── Acesso a dados e operações no banco
└── 📄 View (JSON Responses)
    └── Apresentação dos dados formatados
   
Padrão MVC Implementado
text
📦 UNIFECAF-FLIX
├── 🎮 Controller (controllerFilme.js)
│   └── Lógica de negócio e orquestração
├── 💾 Model (filmeDAO.js) 
│   └── Acesso a dados e operações no banco
└── 📄 View (JSON Responses)
    └── Apresentação dos dados formatados
Fluxo de Requisição
sequenceDiagram
    Client->>+Controller: HTTP Request
    Controller->>+Model: Chamada de método
    Model->>+Database: Query SQL
    Database-->>-Model: Resultados
    Model-->>-Controller: Dados processados
    Controller-->>-Client: JSON Response
🚀 Instalação
Pré-requisitos
Node.js 18 ou superior

MySQL 8.0 ou superior

npm ou yarn

Passos de Instalação
Clone o repositório

bash
git clone https://github.com/EvanildoLeal/UNIFECAF-FLIX.git
cd UNIFECAF-FLIX
Instale as dependências

bash
npm install
Configure as variáveis de ambiente

bash
cp .env.example .env
Configure o banco de dados

sql
CREATE DATABASE db_unifecaf_flix;
Execute as migrações do Prisma

bash
npx prisma generate
npx prisma db push
Popule o banco (opcional)

sql
-- Execute o script SQL fornecido
Inicie a aplicação

bash
# Produção
npm start

# Desenvolvimento
npm run dev
⚙️ Configuração
Variáveis de Ambiente (.env)
env
DATABASE_URL="mysql://usuario:senha@localhost:3306/db_unifecaf_flix"
PORT=3000
NODE_ENV=development
Estrutura da Tabela
sql
CREATE TABLE tbl_filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    diretor VARCHAR(255) NOT NULL,
    anoLancamento INT NOT NULL,
    genero VARCHAR(100) NOT NULL,
    sinopse TEXT NOT NULL,
    duracao INT NOT NULL,
    classificacao VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
🌐 Endpoints
📋 Listar Todos os Filmes
http
GET /v1/fecaf/controle-filmes/filme
🔍 Buscar Filme por ID
http
GET /v1/fecaf/controle-filmes/filme/:id
🔎 Filtrar Filmes
http
GET /v1/fecaf/controle-filmes/filtro/filme?nome=matrix
➕ Criar Novo Filme
http
POST /v1/fecaf/controle-filmes/filme
✏️ Atualizar Filme
http
PUT /v1/fecaf/controle-filmes/filme/:id
🗑️ Deletar Filme
http
DELETE /v1/fecaf/controle-filmes/filme/:id
🏥 Health Check
http
GET /health
💻 Exemplos de Uso
Listar Todos os Filmes
bash
curl http://localhost:3000/v1/fecaf/controle-filmes/filme
Criar um Novo Filme
bash
curl -X POST http://localhost:3000/v1/fecaf/controle-filmes/filme \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Interestelar",
    "diretor": "Christopher Nolan",
    "anoLancamento": 2014,
    "genero": "Ficção Científica",
    "sinopse": "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço...",
    "duracao": 169,
    "classificacao": "10+"
  }'
Filtrar Filmes
bash
curl "http://localhost:3000/v1/fecaf/controle-filmes/filtro/filme?nome=nolan"
📁 Estrutura do Projeto
text
UNIFECAF-FLIX/
├── 📁 controller/
│   └── controllerFilme.js          # Controlador principal
├── 📁 model/
│   └── filmeDAO.js                 # Data Access Object
├── 📁 prisma/
│   ├── schema.prisma               # Schema do banco
│   └── migrations/                 # Migrações do Prisma
├── 📄 .env                         # Variáveis de ambiente
├── 📄 .gitignore                   # Arquivos ignorados no Git
├── 📄 app.js                       # Arquivo principal
├── 📄 package.json                 # Dependências e scripts
└── 📄 README.md                    # Este arquivo
🛠️ Desenvolvimento
Scripts Disponíveis
bash
npm start          # Inicia em produção
npm run dev        # Inicia em desenvolvimento com nodemon
npm test           # Executa testes (a implementar)
npx prisma generate # Gera cliente do Prisma
npx prisma db push # Sincroniza schema com o banco

