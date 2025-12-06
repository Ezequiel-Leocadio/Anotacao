import { getCustomRepository, Like } from "typeorm";
import { ArmazenamentoSementesRepositories } from "../repositories/ArmazenamentoSementesRepositories";

interface IListaRequest {
  id?: number;
  semente: number;
  quantidade: number;
  local_armazenamento: string;
  tratamento: string;
  observacao?: string;
  data: Date;
  data_proximo_plantio: Date;
}

class ArmazenamentoSementeService {
  async create({
    semente,
    quantidade,
    local_armazenamento,
    tratamento,
    observacao,
    data,
    data_proximo_plantio,
  }: IListaRequest) {
    const repositories = getCustomRepository(ArmazenamentoSementesRepositories);

    const create = repositories.create({
      semente,
      quantidade,
      local_armazenamento,
      tratamento,
      observacao,
      data: data + "T23:00:00",

      data_proximo_plantio: data_proximo_plantio + "T23:00:00",
    });

    await repositories.save(create);

    return create;
  }

  async update({
    semente,
    quantidade,
    local_armazenamento,
    tratamento,
    observacao,
    data,
    data_proximo_plantio,
    id,
  }: IListaRequest) {
    const repositories = getCustomRepository(ArmazenamentoSementesRepositories);

    const find = await repositories.findOne({ id });

    if (!find) {
      throw new Error("Erro ao buscar Armazenamento de Semente");
    }

    const up = {
      ...find,
      semente,
      quantidade,
      local_armazenamento,
      tratamento,
      observacao,
      data: data + "T23:00:00",
      data_proximo_plantio: data_proximo_plantio + "T23:00:00",
    };

    await repositories.save(up);

    return up;
  }

  async list() {
    const repositories = getCustomRepository(ArmazenamentoSementesRepositories);

    const list = await repositories.find();

    return list;
  }

  async find({ id }) {
    const repositories = getCustomRepository(ArmazenamentoSementesRepositories);

    const find = await repositories.findOne({
      where: {
        id,
      },
    });

    return find;
  }
}
export { ArmazenamentoSementeService };
