import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("plantio_sementes")
class PlantioSementes {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  semente: number;

  @Column()
  armazenamento: number;

  @Column()
  quantidade: number;

  @Column()
  observacao: string;

  @Column()
  data: Date;

  @Column()
  data_colheita: Date;
}

export { PlantioSementes };
