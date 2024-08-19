import { EntityRepository, Repository } from "typeorm";
import { Notas } from "../entities/Notas";

@EntityRepository(Notas)
class NotasRepositories extends Repository<Notas> {
  async listAll() {
    const sql = `
    SELECT 
        a.*,
        b.descricao,
        b.id as idi, 
        b.marcado,
        b.posicao,
        b.id_nota 
    FROM notas a 
    left join listas b on b.id_nota = a.id
        `;
    return this.query(sql);
  }
}

export { NotasRepositories };
