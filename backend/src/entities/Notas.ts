import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("notas")
class Notas {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column()
  uuid: string;

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

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.uuid = uuid();
    }
  }
}

export { Notas };
