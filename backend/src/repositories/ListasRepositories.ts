import { EntityRepository, Repository } from "typeorm";
import { Listas } from "../entities/Listas";
import { formatDateTimeUsa } from "../util/format";

@EntityRepository(Listas)
class ListasRepositories extends Repository<Listas> {
  async listAll(date) {
    let sql = "";
    if (date) {
      sql = `
        select * from listas a 
        where 
            a.updatedAt > '${formatDateTimeUsa(date)}' 
        order by
            a.posicao desc   
        `;
    } else {
      sql = `
        select * from listas a 
        order by
            a.descricao asc   
        `;
    }

    return this.query(sql);
  }
}

export { ListasRepositories };
