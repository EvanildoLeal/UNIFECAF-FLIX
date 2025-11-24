const express = require("express");
require("dotenv").config();

const cors = require("cors");

// Importar controller
const ControllerFilme = require("./controller/controllerFilme");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rotas da API
// Rotas obrigatórias
app.get('/v1/fecaf/controle-filmes/filme', ControllerFilme.listarFilmes);
app.get('/v1/fecaf/controle-filmes/filme/:id', ControllerFilme.buscarFilmePorId);
app.get('/v1/fecaf/controle-filmes/filtro/filme', ControllerFilme.filtrarFilmes);

// Rotas adicionais para CRUD completo
app.post('/v1/fecaf/controle-filmes/filme', ControllerFilme.criarFilme);
app.put('/v1/fecaf/controle-filmes/filme/:id', ControllerFilme.atualizarFilme);
app.delete('/v1/fecaf/controle-filmes/filme/:id', ControllerFilme.deletarFilme);

// Rota de health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API UniFECAF Flix está funcionando!",
    timestamp: new Date().toISOString(),
  });
});

// Rota padrão - atualize os endpoints listados
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API UniFECAF Flix!',
    version: '1.0.0',
    endpoints: {
      listarFilmes: 'GET /v1/fecaf/controle-filmes/filme',
      buscarFilme: 'GET /v1/fecaf/controle-filmes/filme/:id',
      filtrarFilmes: 'GET /v1/fecaf/controle-filmes/filtro/filme?nome=xxx',
      criarFilme: 'POST /v1/fecaf/controle-filmes/filme',
      atualizarFilme: 'PUT /v1/fecaf/controle-filmes/filme/:id',
      deletarFilme: 'DELETE /v1/fecaf/controle-filmes/filme/:id'
    }
  });
});

// Middleware para rotas não encontradas - CORRIGIDO
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Rota ${req.method} ${req.url} não encontrada`,
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`=== UNIFECAF FLIX API ===`);
  console.log(`Porta: ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`API: http://localhost:${PORT}/v1/fecaf/controle-filmes/filme`);
  console.log(`========================`);
});

module.exports = app;
