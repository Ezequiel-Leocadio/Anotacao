import { Request, Response } from "express";
import { NotaService } from "../services/NotaService";
import { ListaService } from "../services/ListaService";

import fs from "fs";
import path from "path";

class SincronizarController {
  async inserirImage(req: Request, res: Response) {
    const { id } = req.body;
    // console.log(req.body);
    if (!req.file) {
      return res.json({
        success: false,
        message: "Erro, Informe Um Arquivo Válido",
      });
    }
    const { filename } = req.file;
    const service = new NotaService();

    const up = await service.updateImg({ image: filename, id });

    if (up) {
      return res.json({
        success: true,
        message: "Imagem Editada",
      });
    }

    return res.json({
      success: false,
      message: "Erro ao Editar Imagem",
    });
  }

  async inserir(req: Request, res: Response) {
    const { itens } = req.body;
    // const { id: user }: any = req.user;

    // Diretório onde o arquivo será salvo
    const folderPath = "C:/Projetos/Anotacao/backend/bkpsinc/";

    // Criar a pasta caso não exista
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Caminho do arquivo
    const date = new Date();

    const filePath = path.join(
      folderPath,
      `bkpsincronizar${date.getTime()}.json`
    );

    // Escrever o arquivo JSON
    await fs.writeFileSync(filePath, JSON.stringify(itens, null, 2), "utf8");

    const service = new NotaService();
    const serviceList = new ListaService();

    for await (const i of itens) {
      const {
        id_nivel,
        tipo,
        title,
        id,
        anotacao,
        list = [],
        icon,
        uuid,
        image,
        existe,
      } = i;
      // const find = await service.finduuid(uuid);

      let data = null;

      if (tipo === "receita" || tipo === "nota") {
        if (anotacao === "" || anotacao === undefined || anotacao === null) {
          throw new Error("Erro Anotação Nula");
        }
      }

      if (existe) {
        data = await service.update({
          id_nivel,
          tipo,
          title,
          usuario: 1,
          anotacao,
          id,
          icon,
          image,
          uuid,
        });
      } else {
        data = await service.create({
          id_nivel,
          tipo,
          title,
          usuario: 1,
          anotacao,
          id,
          icon,
          uuid,
          image,
        });
      }

      if (!data) {
        return res.json({
          success: false,
          message: "Erro ao Sincronizar",
        });
      }

      for await (const f of list) {
        // console.log(f);
        const { id_nota, posicao, descricao, id, marcado, delet } = f;
        let idI = id;
        const find = await serviceList.find({ id, id_nota });
        if (find) {
          await serviceList.update({
            descricao,
            id_nota,
            posicao,
            id,
            marcado,
          });
        } else {
          const insert = await serviceList.create({
            descricao,
            id_nota,
            posicao,
            id,
            marcado,
          });

          if (insert) {
            idI = insert.id;
          }
        }

        if (delet) {
          await serviceList.delet({ id: idI, id_nota });
        }
      }
    }
    const nota = await service.listAll();
    const list = await serviceList.listAll();
    const data = nota.map((e) => ({
      ...e,
      list: list.filter((f) => f.id_nota === e.id),
    }));

    // console.log(data);

    return res.json({
      success: true,
      message: "Sincronizado",
      data: data,
    });
  }

  async sinconizar(req: Request, res: Response) {
    const { itens, date, itensGet } = req.body;
    // const { id: user }: any = req.user;
    // const datef = itensGet > 0 ? date : null;
    const datef = null;
    // console.log(req.body);

    // Diretório onde o arquivo será salvo
    const folderPath = "C:/Projetos/Anotacao/backend/bkpsinc/";

    // Criar a pasta caso não exista
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Caminho do arquivo
    const datee = new Date();

    const filePath = path.join(
      folderPath,
      `bkpsincronizar${datee.getTime()}.json`
    );

    console.log(filePath);

    // Escrever o arquivo JSON
    await fs.writeFileSync(filePath, JSON.stringify(itens, null, 2), "utf8");

    const service = new NotaService();
    const serviceList = new ListaService();

    for await (const i of itens) {
      const {
        id_nivel,
        tipo,
        title,
        // id,
        anotacao,
        list = [],
        icon,
        uuid,
        image,
        existe,
        id,
      } = i;
      // const find = await service.finduuid(uuid);

      let data = null;

      const find = await service.finduuid(uuid);

      if (tipo === "receita" || tipo === "nota") {
        if (anotacao === "" || anotacao === undefined || anotacao === null) {
          throw new Error("Erro Anotação Nula");
        }
      }

      if (find) {
        data = await service.update({
          id_nivel,
          tipo,
          title,
          usuario: 1,
          anotacao,
          id: id,
          icon,
          image,
          uuid,
        });
      } else {
        data = await service.create({
          id_nivel,
          tipo,
          title,
          usuario: 1,
          anotacao,
          id: id,
          icon,
          uuid,
          image,
        });
      }

      if (!data) {
        return res.json({
          success: false,
          message: "Erro ao Sincronizar",
        });
      }

      for await (const f of list) {
        // console.log(f);
        const { id_nota, posicao, descricao, id, marcado, delet } = f;
        let idI = id;
        const find = await serviceList.find({ id, id_nota });
        if (find) {
          if (delet === 1 || delet === true) {
            await serviceList.delet({ id: idI, id_nota });
          } else {
            await serviceList.update({
              descricao,
              id_nota,
              posicao,
              id,
              marcado,
            });
          }
        } else {
          const insert = await serviceList.create({
            descricao,
            id_nota,
            posicao,
            id,
            marcado,
          });

          if (insert) {
            idI = insert.id;
          }
        }
      }
    }
    const nota = await service.listAll(datef);
    const list = await serviceList.listAll(datef);
    const data = nota.map((e) => ({
      ...e,
      list: list.filter((f) => String(f.id_nota) === String(e.id)),
      edit: false,
    }));

    // console.log(nota[0]);

    return res.json({
      success: true,
      message: "Sincronizado",
      data: data,
      date: new Date(),
    });
  }

  async edit({
    id_nivel,
    tipo,
    title,
    id,
    anotacao,
    list = [],
    icon,
    uuid,
    image,
    existe,
  }) {
    const service = new NotaService();
    const serviceList = new ListaService();

    console.log("Sincronizar socket");

    // const find = await service.finduuid(uuid);

    let data = null;
    const find = await service.finduuid(uuid);

    if (find) {
      data = await service.update({
        id_nivel: id_nivel,
        tipo: tipo,
        title,
        usuario: 1,
        anotacao,
        id,
        icon: icon,
        image,
        uuid,
      });
    } else {
      data = await service.create({
        id_nivel,
        tipo,
        title,
        usuario: 1,
        anotacao,
        id,
        icon,
        uuid,
        image,
      });
    }

    if (!data) {
      return {
        success: false,
        message: "Erro ao Sincronizar",
      };
    }

    for await (const f of list) {
      const { id_nota, posicao, descricao, id, marcado, delet } = f;
      let idI = id;
      const find = await serviceList.find({ id, id_nota });
      if (find) {
        await serviceList.update({
          descricao,
          id_nota,
          posicao,
          id,
          marcado,
        });
      } else {
        const insert = await serviceList.create({
          descricao,
          id_nota,
          posicao,
          id,
          marcado,
        });

        if (insert) {
          idI = insert.id;
        }
      }

      if (delet) {
        await serviceList.delet({ id: idI, id_nota });
      }
    }

    return {
      success: true,
      message: "Sincronizado",
    };
  }

  async listar(req: Request, res: Response) {
    const service = new NotaService();

    const list = await service.listAll();

    return res.json({
      success: true,
      message: "Notas",
      data: list,
    });
  }
}

export { SincronizarController };
