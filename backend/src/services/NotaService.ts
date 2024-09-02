import { getCustomRepository, Like, Not } from "typeorm";
import { NotasRepositories } from "../repositories/NotasRepositories";

interface INotaRequest {
  id: number;
  title: string;
  icon: string;
  id_nivel: number;
  anotacao?: string;
  tipo: string;
  usuario: number;
  image?: string;
  uuid?: string;
}

class NotaService {
  async create({
    title,
    id_nivel,
    anotacao,
    tipo,
    usuario,
    id,
    icon,
    uuid,
    image,
  }: INotaRequest) {
    const repositories = getCustomRepository(NotasRepositories);

    const create = repositories.create({
      title,
      id_nivel,
      anotacao,
      tipo,
      usuario,
      id,
      icon,
      uuid,
      image,
    });

    await repositories.save(create);

    return create;
  }

  async update({
    title,
    id_nivel,
    anotacao,
    tipo,
    usuario,
    id,
    icon,
    image,
  }: INotaRequest) {
    const repositories = getCustomRepository(NotasRepositories);

    const find = await repositories.findOne({ id });

    if (!find) {
      throw new Error("Erro ao buscar Nota");
    }

    const up = {
      ...find,
      title,
      id_nivel,
      anotacao,
      tipo,
      usuario,
      icon,
      image,
    };

    await repositories.save(up);

    return up;
  }

  async updateImg({ image, id }) {
    const repositories = getCustomRepository(NotasRepositories);

    const find = await repositories.findOne({ id });

    if (!find) {
      throw new Error("Erro ao buscar Nota");
    }

    const up = {
      ...find,
      image,
    };

    await repositories.save(up);

    return up;
  }

  async list({ id_nivel, title }) {
    const repositories = getCustomRepository(NotasRepositories);

    const list = await repositories.find({
      where: {
        title: Like(`%${title}%`),
        id_nivel: id_nivel,
      },

      order: {
        title: "ASC",
      },
    });

    return list;
  }

  async listAll() {
    const repositories = getCustomRepository(NotasRepositories);

    const list = await repositories.find({
      where: {
        tipo: Not("excluido"),
      },
      order: {
        title: "ASC",
      },
    });

    return list;
  }

  async find(id) {
    const repositories = getCustomRepository(NotasRepositories);

    const find = await repositories.findOne({
      where: {
        id,
      },
    });

    return find;
  }

  async finduuid(uuid) {
    const repositories = getCustomRepository(NotasRepositories);

    const find = await repositories.findOne({
      where: {
        uuid,
      },
    });

    return find;
  }
}
export { NotaService };
