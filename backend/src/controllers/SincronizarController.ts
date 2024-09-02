import { Request, Response } from "express";
import { NotaService } from "../services/NotaService";
import { ListaService } from "../services/ListaService";

class SincronizarController {
  async inserirImage(req: Request, res: Response) {
    const { id } = req.body;
    console.log(req.body);
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
    const { id: user }: any = req.user;

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
      } = i;
      const find = await service.finduuid(i.uuid);

      let data = null;

      if (find) {
        data = await service.update({
          id_nivel,
          tipo,
          title,
          usuario: user,
          anotacao,
          id,
          icon,
          image,
        });
      } else {
        data = await service.create({
          id_nivel,
          tipo,
          title,
          usuario: user,
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
        const { id_nota, posicao, descricao, id, marcado } = f;

        const find = await serviceList.find(id);
        if (find) {
          await serviceList.update({
            descricao,
            id_nota,
            posicao,
            id,
            marcado,
          });
        } else {
          await serviceList.create({
            descricao,
            id_nota,
            posicao,
            id,
            marcado,
          });
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
