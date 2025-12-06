import { EntityRepository, Repository } from "typeorm";
import { ArmazenamentoSementes } from "../entities/ArmazenamentoSementes";

@EntityRepository(ArmazenamentoSementes)
class ArmazenamentoSementesRepositories extends Repository<ArmazenamentoSementes> {}

export { ArmazenamentoSementesRepositories };
