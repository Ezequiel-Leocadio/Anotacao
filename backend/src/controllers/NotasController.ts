import { Request, Response } from "express";
import { NotaService } from "../services/NotaService";

class NotasController {
  async inserir(req: Request, res: Response) {
    const { id_nivel, tipo, title, anotacao, id, icon } = req.body;
    const { id: user }: any = req.user;

    const service = new NotaService();

    const create = await service.create({
      id_nivel,
      tipo,
      title,
      usuario: user,
      anotacao,
      id,
      icon,
    });

    return res.json({
      success: true,
      message: "Inserido",
      data: create,
    });
  }
  async editar(req: Request, res: Response) {
    const { id, id_nivel, tipo, title, anotacao, icon } = req.body;

    const service = new NotaService();

    const update = await service.update({
      id_nivel,
      tipo,
      title,
      anotacao,
      usuario: req.user.id,
      id,
      icon,
    });

    return res.json({
      success: true,
      message: "Editado",
      data: update,
    });
  }

  async listar(req: Request, res: Response) {
    const { id_nivel, title }: any = req.query;

    const service = new NotaService();

    const list = await service.list({ id_nivel, title });

    return res.json({
      success: true,
      message: "Notas",
      data: list,
    });
  }

  async find(req: Request, res: Response) {
    const { id }: any = req.query;

    const service = new NotaService();

    const find = await service.find(id);

    return res.json({
      success: true,
      message: "Nota",
      data: find,
    });
  }
}

export { NotasController };
