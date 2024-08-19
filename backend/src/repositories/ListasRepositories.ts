import { EntityRepository, Repository } from "typeorm";
import { Listas } from "../entities/Listas";

@EntityRepository(Listas)
class ListasRepositories extends Repository<Listas> {}

export { ListasRepositories };
