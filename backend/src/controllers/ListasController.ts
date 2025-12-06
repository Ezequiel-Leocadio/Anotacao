import { Request, Response } from "express";
import { ListaService } from "../services/ListaService";

class ListasController {
  async inserir(req: Request, res: Response) {
    const { descricao, id_nota, posicao, marcado, id, secao } = req.body;

    const service = new ListaService();

    const create = await service.create({
      descricao,
      id_nota,
      posicao,
      marcado,
      id,
      secao,
    });

    return res.json({
      success: true,
      message: "Inserido",
      data: create,
    });
  }
  async editar(req: Request, res: Response) {
    const { id, descricao, id_nota, posicao, marcado, secao } = req.body;

    const service = new ListaService();

    const update = await service.update({
      descricao,
      id_nota,
      posicao,
      id,
      marcado,
      secao,
    });

    return res.json({
      success: true,
      message: "Editado",
      data: update,
    });
  }

  async listar(req: Request, res: Response) {
    const { descricao, id_nota }: any = req.query;

    const service = new ListaService();

    const list = await service.list({ descricao, id_nota });

    return res.json({
      success: true,
      message: "Listas",
      data: list,
    });
  }

  async find(req: Request, res: Response) {
    const { id }: any = req.query;

    const service = new ListaService();

    const find = await service.find(id);

    return res.json({
      success: true,
      message: "Lista",
      data: find,
    });
  }

  async secao() {
    const service = new ListaService();

    const list = await service.secao();
    return list;
  }
}

export { ListasController };
