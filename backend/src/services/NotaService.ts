import { createConnection, getCustomRepository, Like, Not } from "typeorm";
import { NotasRepositories } from "../repositories/NotasRepositories";
import mysqldump from "mysqldump";

interface INotaRequest {
  id: string;
  title: string;
  icon: string;
  id_nivel: string;
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
      id_nota: id,
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
    uuid,
  }: INotaRequest) {
    const repositories = getCustomRepository(NotasRepositories);

    const find = await repositories.findOne({
      where: {
        uuid,
      },
    });

    if (!find) {
      throw new Error("Erro ao buscar Nota");
    }

    const up = {
      ...find,
      title,
      // id_nivel,
      id_nota: id,

      anotacao,
      tipo,
      // usuario,
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

  async listAll(date = null) {
    const repositories = getCustomRepository(NotasRepositories);

    const list = await repositories.listAll(date);

    // await repositories.find({
    //   where: {
    //     tipo: Not("excluido"),
    //   },
    //   order: {
    //     title: "ASC",
    //   },
    // });

    return list;
  }

  async find(id) {
    const repositories = getCustomRepository(NotasRepositories);

    const find = await repositories.findOne({
      where: {
        id_nota: id,
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

  async backupDatabase() {
    //  const connection = await createConnection();
    const date = new Date();

    const backupPath = `C:/Projetos/Anotacao/BKP_DB/backupNotas-${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}.sql`;

    const bkp = await mysqldump({
      connection: {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "notas",
      },
      dumpToFile: backupPath, // Caminho onde o dump será salvo
    });

    // console.log(bkp);
  }
}
export { NotaService };
