import { getCustomRepository, Like } from "typeorm";
import { SementesRepositories } from "../repositories/SementesRepositories";

interface IListaRequest {
  id?: number;
  nome: string;
  outros_nomes: string;
  imagem: string;
  especie: string;
  origem: string;
  observacao?: string;
  data: Date;
  dias_colheita: number;
}

class SementeService {
  async create({
    nome,
    outros_nomes,
    imagem,
    especie,
    origem,
    observacao,
    data,
    dias_colheita,
  }: IListaRequest) {
    const repositories = getCustomRepository(SementesRepositories);

    const create = repositories.create({
      nome,
      outros_nomes,
      imagem,
      especie,
      origem,
      observacao,
      data: data + "T23:00:00",

      dias_colheita,
    });

    await repositories.save(create);

    return create;
  }

  async update({
    nome,
    outros_nomes,
    imagem,
    especie,
    origem,
    observacao,
    data,
    dias_colheita,
    id,
  }: IListaRequest) {
    const repositories = getCustomRepository(SementesRepositories);

    const find = await repositories.findOne({ id });

    if (!find) {
      throw new Error("Erro ao buscar Semente");
    }

    const up = {
      ...find,
      nome,
      outros_nomes,
      imagem,
      especie,
      origem,
      observacao,
      data: data + "T23:00:00",

      dias_colheita,
    };

    await repositories.save(up);

    return up;
  }

  async list() {
    const repositories = getCustomRepository(SementesRepositories);

    const list = await repositories.find();

    return list;
  }

  async find({ id }) {
    const repositories = getCustomRepository(SementesRepositories);

    const find = await repositories.findOne({
      where: {
        id,
      },
    });

    return find;
  }
}
export { SementeService };
