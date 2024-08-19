import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("notas")
class Notas {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column()
  id_nivel: number;

  @Column()
  anotacao: string;

  @Column()
  tipo: string;

  @Column()
  icon: string;

  @Column()
  usuario: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { Notas };
