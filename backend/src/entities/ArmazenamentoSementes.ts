import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("armazenamento_sementes")
class ArmazenamentoSementes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  semente: number;

  @Column()
  quantidade: number;

  @Column()
  local_armazenamento: string;

  @Column()
  tratamento: string;

  @Column()
  observacao: string;

  @Column()
  data: Date;

  @Column()
  data_proximo_plantio: Date;
}

export { ArmazenamentoSementes };
