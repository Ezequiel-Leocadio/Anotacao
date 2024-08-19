import { EntityRepository, Repository } from "typeorm";
import { Usuarios } from "../entities/Usuarios";

@EntityRepository(Usuarios)
class UsuariosRepositories extends Repository<Usuarios> {}

export { UsuariosRepositories };
