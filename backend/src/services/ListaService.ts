import { getCustomRepository, Like } from "typeorm";
import { ListasRepositories } from "../repositories/ListasRepositories";

interface IListaRequest {
  id: number;
  id_nota: number;
  posicao: number;
  marcado: boolean;
  descricao: string;
}

class ListaService {
  async create({ id_nota, posicao, descricao, marcado, id }: IListaRequest) {
    const repositories = getCustomRepository(ListasRepositories);

    const create = repositories.create({
      id_nota,
      posicao,
      descricao,
      marcado,
      id,
    });

    await repositories.save(create);

    return create;
  }

  async update({ id_nota, posicao, descricao, id, marcado }: IListaRequest) {
    const repositories = getCustomRepository(ListasRepositories);

    const find = await repositories.findOne({ id });

    if (!find) {
      throw new Error("Erro ao buscar Nota");
    }

    const up = {
      ...find,
      id_nota,
      posicao,
      descricao,
      marcado,
    };

    await repositories.save(up);

    return up;
  }

  async list({ id_nota, descricao }) {
    const repositories = getCustomRepository(ListasRepositories);

    const list = await repositories.find({
      where: {
        descricao: Like(`%${descricao}%`),
        id_nota: id_nota,
      },

      order: {
        posicao: "ASC",
      },
    });

    return list;
  }

  async listAll() {
    const repositories = getCustomRepository(ListasRepositories);

    const list = await repositories.find({
      order: {
        posicao: "ASC",
      },
    });

    return list;
  }

  async find(id) {
    const repositories = getCustomRepository(ListasRepositories);

    const find = await repositories.findOne({
      where: {
        id,
      },
    });

    return find;
  }
}
export { ListaService };
