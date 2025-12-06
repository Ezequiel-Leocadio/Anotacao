import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("listas")
class Listas {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  id_nota: string;

  @Column()
  posicao: number;

  @Column()
  descricao: string;

  @Column()
  marcado: boolean;

  @Column()
  secao: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { Listas };
