import { EntityRepository, Repository } from "typeorm";
import { Notas } from "../entities/Notas";
import { formatDateTimeUsa } from "../util/format";

@EntityRepository(Notas)
class NotasRepositories extends Repository<Notas> {
  async listAllq() {
    const sql = `
    SELECT 
        a.title,
        a.id_nivel,
        a.anotacao,
        a.tipo,
        a.icon,
        a.image,
        a.uuid,
        a.existe,
        b.descricao,
        b.id as idi, 
        b.marcado,
        b.posicao,
        b.id_nota,
        a.id_nota as id 
    FROM notas a 
    left join listas b on b.id_nota = a.id
        `;
    return this.query(sql);
  }

  async listAll(date) {
    let sql = "";
    if (date) {
      sql = `
      SELECT 
        a.title,
        a.id_nivel,
        a.anotacao,
        a.tipo,
        a.icon,
        a.image,
        a.uuid,
        a.existe,
        a.id as codigo,
        a.id_nota as id  
      FROM notas a 
      where 
        a.tipo <> 'excluido'
        and a.updatedAt > '${formatDateTimeUsa(date)}' 
      order by
        a.title
      `;
    } else {
      sql = `
      SELECT 
        a.title,
        a.id_nivel,
        a.anotacao,
        a.tipo,
        a.icon,
        a.image,
        a.uuid,
        a.existe,
        a.id as codigo,
        a.id_nota as id 
      FROM notas a 
      where 
        a.tipo <> 'excluido'
      order by
        a.title
      `;
    }

    // console.log(sql);

    return this.query(sql);
  }
}

export { NotasRepositories };
