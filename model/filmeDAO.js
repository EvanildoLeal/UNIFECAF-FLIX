const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class FilmeDAO {
  // Buscar todos os filmes
  static async findAll() {
    try {
      return await prisma.filme.findMany({
        orderBy: { titulo: "asc" },
      });
    } catch (error) {
      throw new Error(`Erro ao buscar filmes: ${error.message}`);
    }
  }

  // Buscar filme por ID
  static async findById(id) {
    try {
      return await prisma.filme.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      throw new Error(`Erro ao buscar filme por ID: ${error.message}`);
    }
  }

  // Filtrar filmes por nome, diretor ou sinopse
  static async searchByTerm(term) {
    try {
      return await prisma.filme.findMany({
        where: {
          OR: [
            { titulo: { contains: term } },
            { sinopse: { contains: term } },
            { diretor: { contains: term } },
            { genero: { contains: term } },
          ],
        },
        orderBy: { titulo: "asc" },
      });
    } catch (error) {
      throw new Error(`Erro ao filtrar filmes: ${error.message}`);
    }
  }

  // Criar novo filme
  static async create(filmeData) {
    try {
      return await prisma.filme.create({
        data: filmeData,
      });
    } catch (error) {
      throw new Error(`Erro ao criar filme: ${error.message}`);
    }
  }

  // Atualizar filme
  static async update(id, filmeData) {
    try {
      return await prisma.filme.update({
        where: { id: parseInt(id) },
        data: filmeData,
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar filme: ${error.message}`);
    }
  }

  // Deletar filme
  static async delete(id) {
    try {
      return await prisma.filme.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      throw new Error(`Erro ao deletar filme: ${error.message}`);
    }
  }

  // Fechar conexão (opcional - Prisma gerencia automaticamente)
  static async disconnect() {
    await prisma.$disconnect();
  }
}

module.exports = FilmeDAO;
