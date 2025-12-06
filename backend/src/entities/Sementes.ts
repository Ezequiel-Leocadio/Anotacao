import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("sementes")
class Sementes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  nome: string;

  @Column()
  outros_nomes: string;

  @Column()
  imagem: string;

  @Column()
  especie: string;

  @Column()
  origem: string;

  @Column()
  observacao: string;

  @Column()
  data: Date;

  @Column()
  dias_colheita: number;
}

export { Sementes };
