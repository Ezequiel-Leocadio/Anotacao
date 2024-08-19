import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

class UsuarioController {
  async login(req: Request, res: Response) {
    const { login, senha } = req.body;

    const service = new UsuarioService();

    const token = await service.authenticate({
      usuario: login,
      senha,
    });

    return res.json({
      success: true,
      message: "Sucesso",
      data: token,
    });
  }

  async inserir(req: Request, res: Response) {
    const { nome, usuario, senha, admin, ativo } = req.body;

    const service = new UsuarioService();

    const create = await service.create({
      usuario,
      nome,
      senha,
      admin: admin === "1",
      ativo: ativo === "1",
    });

    return res.json({
      success: true,
      message: "Inserido",
      data: create,
    });
  }
  async editar(req: Request, res: Response) {
    const { usuario, nome, id, admin, ativo } = req.body;

    const service = new UsuarioService();

    const update = await service.update({
      usuario,
      id,
      admin: admin === "1",
      ativo: ativo === "1",
      nome,
    });

    return res.json({
      success: true,
      message: "Editado",
      data: update,
    });
  }

  async editarUser(req: Request, res: Response) {
    const { usuario, nome, senha, senhaAntiga, confirmSenha } = req.body;

    const { id } = req.user;

    const service = new UsuarioService();

    const update = await service.updateUser({
      usuario,
      senha,
      senhaAntiga,
      confirmSenha,
      nome,
      id,
    });

    return res.json({
      success: true,
      message: "Editado",
      data: update,
    });
  }

  async editarSenha(req: Request, res: Response) {
    const { senha, id } = req.body;

    const service = new UsuarioService();

    const update = await service.updatePass({
      senha,
      id,
    });

    return res.json({
      success: true,
      message: "Senha Alterada",
      data: update,
    });
  }
  async listar(req: Request, res: Response) {
    const { nome, usuario, ativo }: any = req.query;

    const service = new UsuarioService();

    const list = await service.list({ nome, usuario, ativo: true });

    return res.json({
      success: true,
      message: "Usuários",
      data: list,
    });
  }

  async listarAll(req: Request, res: Response) {
    const { nome, usuario, ativo }: any = req.query;

    const service = new UsuarioService();

    const list = await service.list({ nome, usuario, ativo: ativo === "1" });

    return res.json({
      success: true,
      message: "Usuários",
      data: list,
    });
  }

  async find(req: Request, res: Response) {
    const { id }: any = req.query;

    const service = new UsuarioService();

    const find = await service.find(id);

    return res.json({
      success: true,
      message: "Usuário",
      data: find,
    });
  }
}

export { UsuarioController };
