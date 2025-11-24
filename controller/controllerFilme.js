const FilmeDAO = require("../model/filmeDAO");

class ControllerFilme {
  // GET /v1/controle-filmes/filme - Listar todos os filmes
  static async listarFilmes(req, res) {
    try {
      const filmes = await FilmeDAO.findAll();

      res.status(200).json({
        status: "success",
        data: filmes,
        count: filmes.length,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Erro em listarFilmes:", error);
      res.status(500).json({
        status: "error",
        message: "Erro interno do servidor ao buscar filmes",
      });
    }
  }

  // GET /v1/controle-filmes/filme/:id - Buscar filme por ID
  static async buscarFilmePorId(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return res.status(400).json({
          status: "error",
          message: "ID deve ser um número válido",
        });
      }

      const filme = await FilmeDAO.findById(id);

      if (!filme) {
        return res.status(404).json({
          status: "error",
          message: "Filme não encontrado",
        });
      }

      res.status(200).json({
        status: "success",
        data: filme,
      });
    } catch (error) {
      console.error("Erro em buscarFilmePorId:", error);
      res.status(500).json({
        status: "error",
        message: "Erro interno do servidor ao buscar filme",
      });
    }
  }

  // GET /v1/controle-filmes/filtro/filme?nome=xxx - Filtrar filmes
  static async filtrarFilmes(req, res) {
    try {
      const { nome } = req.query;

      if (!nome || nome.trim() === "") {
        return res.status(400).json({
          status: "error",
          message: 'Parâmetro "nome" é obrigatório para filtrar filmes',
        });
      }

      const filmes = await FilmeDAO.searchByTerm(nome.trim());

      res.status(200).json({
        status: "success",
        data: filmes,
        count: filmes.length,
        searchTerm: nome,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Erro em filtrarFilmes:", error);
      res.status(500).json({
        status: "error",
        message: "Erro interno do servidor ao filtrar filmes",
      });
    }
  }

  // POST /v1/controle-filmes/filme - Criar novo filme
  static async criarFilme(req, res) {
    try {
      const {
        titulo,
        diretor,
        anoLancamento,
        genero,
        sinopse,
        duracao,
        classificacao,
      } = req.body;

      // Validação dos campos obrigatórios
      const camposObrigatorios = {
        titulo,
        diretor,
        anoLancamento,
        genero,
        sinopse,
        duracao,
        classificacao,
      };
      const camposFaltantes = Object.entries(camposObrigatorios)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (camposFaltantes.length > 0) {
        return res.status(400).json({
          status: "error",
          message: `Campos obrigatórios faltando: ${camposFaltantes.join(
            ", "
          )}`,
        });
      }

      const filmeData = {
        titulo: titulo.trim(),
        diretor: diretor.trim(),
        anoLancamento: parseInt(anoLancamento),
        genero: genero.trim(),
        sinopse: sinopse.trim(),
        duracao: parseInt(duracao),
        classificacao: classificacao.trim(),
      };

      const novoFilme = await FilmeDAO.create(filmeData);

      res.status(201).json({
        status: "success",
        message: "Filme criado com sucesso",
        data: novoFilme,
      });
    } catch (error) {
      console.error("Erro em criarFilme:", error);
      res.status(500).json({
        status: "error",
        message: "Erro interno do servidor ao criar filme",
      });
    }
  }

  // PUT /v1/controle-filmes/filme/:id - Atualizar filme
  static async atualizarFilme(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizacao = req.body;

      if (isNaN(id)) {
        return res.status(400).json({
          status: "error",
          message: "ID deve ser um número válido",
        });
      }

      // Verificar se o filme existe
      const filmeExistente = await FilmeDAO.findById(id);
      if (!filmeExistente) {
        return res.status(404).json({
          status: "error",
          message: "Filme não encontrado para atualização",
        });
      }

      // Preparar dados para atualização
      const filmeData = {};
      if (dadosAtualizacao.titulo)
        filmeData.titulo = dadosAtualizacao.titulo.trim();
      if (dadosAtualizacao.diretor)
        filmeData.diretor = dadosAtualizacao.diretor.trim();
      if (dadosAtualizacao.anoLancamento)
        filmeData.anoLancamento = parseInt(dadosAtualizacao.anoLancamento);
      if (dadosAtualizacao.genero)
        filmeData.genero = dadosAtualizacao.genero.trim();
      if (dadosAtualizacao.sinopse)
        filmeData.sinopse = dadosAtualizacao.sinopse.trim();
      if (dadosAtualizacao.duracao)
        filmeData.duracao = parseInt(dadosAtualizacao.duracao);
      if (dadosAtualizacao.classificacao)
        filmeData.classificacao = dadosAtualizacao.classificacao.trim();

      const filmeAtualizado = await FilmeDAO.update(id, filmeData);

      res.status(200).json({
        status: "success",
        message: "Filme atualizado com sucesso",
        data: filmeAtualizado,
      });
    } catch (error) {
      console.error("Erro em atualizarFilme:", error);
      res.status(500).json({
        status: "error",
        message: "Erro interno do servidor ao atualizar filme",
      });
    }
  }

  // DELETE /v1/controle-filmes/filme/:id - Deletar filme
  static async deletarFilme(req, res) {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        return res.status(400).json({
          status: "error",
          message: "ID deve ser um número válido",
        });
      }

      // Verificar se o filme existe
      const filmeExistente = await FilmeDAO.findById(id);
      if (!filmeExistente) {
        return res.status(404).json({
          status: "error",
          message: "Filme não encontrado para exclusão",
        });
      }

      await FilmeDAO.delete(id);

      res.status(200).json({
        status: "success",
        message: "Filme deletado com sucesso",
      });
    } catch (error) {
      console.error("Erro em deletarFilme:", error);
      res.status(500).json({
        status: "error",
        message: "Erro interno do servidor ao deletar filme",
      });
    }
  }
}

module.exports = ControllerFilme;
