import { EntityRepository, Repository } from "typeorm";
import { PlantioSementes } from "../entities/PlantioSementes";

@EntityRepository(PlantioSementes)
class PlantioSementesRepositories extends Repository<PlantioSementes> {}

export { PlantioSementesRepositories };
