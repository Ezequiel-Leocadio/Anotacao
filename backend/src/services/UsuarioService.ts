import { getCustomRepository, Like } from "typeorm";
import { UsuariosRepositories } from "../repositories/UsuariosRepositories";
import { compare, hash, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IUsuarioRequest {
  id?: number;
  usuario: string;
  nome?: string;
  senha?: string;
  senhaAntiga?: string;
  confirmSenha?: string;
  ativo?: boolean;
  admin?: boolean;
}

interface IUsuarioRequestEditPass {
  id: number;
  senha: string;
}

interface IAuthenticateRequest {
  usuario: string;
  senha: string;
}

class UsuarioService {
  async authenticate({ usuario, senha }: IAuthenticateRequest) {
    const repositories = getCustomRepository(UsuariosRepositories);

    //Verificar Login
    const user = await repositories.findOne({ usuario });
    if (!user) {
      throw new Error("Login/Senha Incorreto");
    }

    if (!user.ativo) {
      throw new Error("Erro, Usuário Inativo");
    }

    //Verificar Senha
    const passwordMatch = await compareSync(senha, user.senha);

    if (!passwordMatch) {
      throw new Error("Login/Senha Incorreto");
    }

    const token = sign(
      {
        usuario: user.usuario,
        nome: user.nome,
        id: user.id,
        admin: user.admin,
      },
      process.env.KEY_TOKEN,
      {
        subject: String(user.id),
        expiresIn: "1d",
      }
    );

    return { token, user };
  }

  async create({ nome, usuario, senha, admin, ativo }: IUsuarioRequest) {
    const repositories = getCustomRepository(UsuariosRepositories);

    const userAlreadyExists = await repositories.findOne({
      usuario,
    });

    if (userAlreadyExists) {
      throw new Error("Usuário Já Cadastrado");
    }

    const passwordHash = await hash(senha, 8);

    const create = repositories.create({
      nome,
      usuario,
      senha: passwordHash,
      ativo: true,
      admin: admin,
    });

    await repositories.save(create);

    return create;
  }

  async update({ usuario, nome, admin, ativo, id }: IUsuarioRequest) {
    const repositories = getCustomRepository(UsuariosRepositories);

    const find = await repositories.findOne({ id });

    if (!find) {
      throw new Error("Erro ao buscar Usuário");
    }

    const up = {
      ...find,
      usuario,
      nome,
      admin,
      ativo,
    };

    await repositories.save(up);

    return up;
  }

  async updateUser({
    usuario,
    nome,
    senha,
    senhaAntiga,
    confirmSenha,
    id,
  }: IUsuarioRequest) {
    const repositories = getCustomRepository(UsuariosRepositories);

    const find = await repositories.findOne({ id });

    if (!find) {
      throw new Error("Erro ao buscar Usuário");
    }
    const compare = compareSync(senhaAntiga, find.senha);

    if (confirmSenha !== senha || !compare) {
      throw new Error("Senha Não Conferem");
    }
    const passwordHash = await hash(senha, 8);

    const up = {
      ...find,
      usuario,
      nome,
      senha: passwordHash,
    };

    await repositories.save(up);

    return up;
  }

  async updatePass({ senha, id }: IUsuarioRequestEditPass) {
    const repositories = getCustomRepository(UsuariosRepositories);

    const find = await repositories.findOne({ id });

    if (!find) {
      throw new Error("Erro ao buscar Usuário");
    }

    const passwordHash = await hash(senha, 8);

    const up = {
      ...find,
      senha: passwordHash,
    };

    await repositories.save(up);

    return up;
  }

  async list({ nome, usuario, ativo }: IUsuarioRequest) {
    const repositories = getCustomRepository(UsuariosRepositories);

    const list = await repositories.find({
      where: {
        nome: Like(`%${nome}%`),
        usuario: Like(`%${usuario}%`),
        ativo: ativo,
      },

      order: {
        nome: "ASC",
      },
    });

    return list;
  }

  async find(id) {
    const repositories = getCustomRepository(UsuariosRepositories);

    const find = await repositories.findOne({ id });

    return find;
  }
}
export { UsuarioService };
