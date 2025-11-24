const express = require("express");
require("dotenv").config();

// Importar controller
const ControllerFilme = require("./controller/controllerFilme");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rotas da API
// Rotas obrigatórias
app.get("/v1/controle-filmes/filme", ControllerFilme.listarFilmes);
app.get("/v1/controle-filmes/filme/:id", ControllerFilme.buscarFilmePorId);
app.get("/v1/controle-filmes/filtro/filme", ControllerFilme.filtrarFilmes);

// Rotas adicionais para CRUD completo
app.post("/v1/controle-filmes/filme", ControllerFilme.criarFilme);
app.put("/v1/controle-filmes/filme/:id", ControllerFilme.atualizarFilme);
app.delete("/v1/controle-filmes/filme/:id", ControllerFilme.deletarFilme);

// Rota de health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API UniFECAF Flix está funcionando!",
    timestamp: new Date().toISOString(),
  });
});

// Rota padrão
app.get("/", (req, res) => {
  res.json({
    message: "Bem-vindo à API UniFECAF Flix!",
    version: "1.0.0",
    endpoints: {
      listarFilmes: "GET /v1/controle-filmes/filme",
      buscarFilme: "GET /v1/controle-filmes/filme/:id",
      filtrarFilmes: "GET /v1/controle-filmes/filtro/filme?nome=xxx",
      criarFilme: "POST /v1/controle-filmes/filme",
      atualizarFilme: "PUT /v1/controle-filmes/filme/:id",
      deletarFilme: "DELETE /v1/controle-filmes/filme/:id",
    },
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
  console.log(`🎬 UniFECAF Flix API rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 API Base: http://localhost:${PORT}/v1/controle-filmes/filme`);
});

module.exports = app;
