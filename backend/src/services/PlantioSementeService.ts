import { getCustomRepository, Like } from "typeorm";
import { PlantioSementesRepositories } from "../repositories/PlantioSementesRepositories";

interface IListaRequest {
  id?: number;
  semente: number;
  armazenamento: number;
  quantidade: number;
  observacao?: string;
  data_colheita: Date;
  data: Date;
}

class PlantioSementeService {
  async create({
    semente,
    quantidade,
    armazenamento,
    data_colheita,
    observacao,
    data,
  }: IListaRequest) {
    const repositories = getCustomRepository(PlantioSementesRepositories);

    const create = repositories.create({
      semente,
      quantidade,
      armazenamento,
      data_colheita: data_colheita,
      observacao,
      data: data + "T23:00:00",
    });

    await repositories.save(create);

    return create;
  }

  async update({
    semente,
    quantidade,
    armazenamento,
    data_colheita,
    observacao,
    data,
    id,
  }: IListaRequest) {
    const repositories = getCustomRepository(PlantioSementesRepositories);

    const find = await repositories.findOne({ id });

    if (!find) {
      throw new Error("Erro ao buscar Plantio de Semente");
    }

    const up = {
      ...find,
      semente,
      quantidade,
      armazenamento,
      data: data,
      data_colheita: data_colheita,
      observacao,
    };

    await repositories.save(up);

    return up;
  }

  async list() {
    const repositories = getCustomRepository(PlantioSementesRepositories);

    const list = await repositories.find();

    return list;
  }

  async find({ id }) {
    const repositories = getCustomRepository(PlantioSementesRepositories);

    const find = await repositories.findOne({
      where: {
        id,
      },
    });

    return find;
  }
}
export { PlantioSementeService };
