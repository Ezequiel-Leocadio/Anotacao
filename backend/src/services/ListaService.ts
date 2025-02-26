import { getCustomRepository, Like } from "typeorm";
import { ListasRepositories } from "../repositories/ListasRepositories";

interface IListaRequest {
  id: number;
  id_nota: string;
  posicao: number;
  marcado: any;
  descricao: string;
}

class ListaService {
  async create({ id_nota, posicao, descricao, marcado, id }: IListaRequest) {
    const repositories = getCustomRepository(ListasRepositories);
    let marcadof = false;
    if (marcado || Number(marcado) === 1) {
      marcadof = true;
    }
    const create = repositories.create({
      id_nota,
      posicao,
      descricao,
      marcado: marcadof,
    });

    await repositories.save(create);

    return create;
  }

  async update({ id_nota, posicao, descricao, id, marcado }: IListaRequest) {
    const repositories = getCustomRepository(ListasRepositories);

    const find = await repositories.findOne({ id, id_nota });

    if (!find) {
      throw new Error("Erro ao buscar Nota");
    }
    let marcadof = false;
    if (marcado || Number(marcado) === 1) {
      marcadof = true;
    }

    const up = {
      ...find,
      id_nota,
      posicao,
      descricao,
      marcado: marcadof,
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

  async listAll(date = null) {
    const repositories = getCustomRepository(ListasRepositories);

    const list = await repositories.listAll(date);

    // await repositories.find({
    //   order: {
    //     posicao: "ASC",
    //   },
    // });

    return list;
  }

  async find({ id, id_nota }) {
    const repositories = getCustomRepository(ListasRepositories);

    const find = await repositories.findOne({
      where: {
        id,
        id_nota,
      },
    });

    return find;
  }

  async delet({ id, id_nota }) {
    const repositories = getCustomRepository(ListasRepositories);

    const find = await repositories.findOne({
      where: {
        id,
        id_nota,
      },
    });

    await repositories.remove(find);

    return find;
  }
}
export { ListaService };
