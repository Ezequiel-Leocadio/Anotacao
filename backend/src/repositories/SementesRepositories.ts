import { EntityRepository, Repository } from "typeorm";
import { Sementes } from "../entities/Sementes";

@EntityRepository(Sementes)
class SementesRepositories extends Repository<Sementes> {}

export { SementesRepositories };
