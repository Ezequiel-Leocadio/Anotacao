import { EntityRepository, Repository } from "typeorm";
import { Listas } from "../entities/Listas";
import { formatDateTimeUsa } from "../util/format";

@EntityRepository(Listas)
class ListasRepositories extends Repository<Listas> {
  async listAll(date) {
    let sql = "";
    if (date) {
      sql = `
        select a.*, b.descricao as desc_secao from listas a 
        left join secao b on a.secao = b.id
        where 
            a.updatedAt > '${formatDateTimeUsa(date)}' 
        order by
            b.posicao desc   
        `;
    } else {
      sql = `
        select a.*, b.descricao as desc_secao from listas a 
          left join secao b on a.secao = b.id
        order by
            b.descricao asc   
        `;
    }

    return this.query(sql);
  }

  async secao() {
    const sql = "select a.id as value, a.descricao as label from secao a";
    return this.query(sql);
  }
}

export { ListasRepositories };
