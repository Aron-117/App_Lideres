import { Entrega } from 'src/entrega/entities/entrega.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class ArchivoEntrega {
    @PrimaryGeneratedColumn()
    id_archivo: number;
    @ManyToOne(() => Entrega, entrega => entrega.archivos)
    @JoinColumn({ name: 'id_entrega' })
    entrega: Entrega;
    @Column({ length: 255 })
    nombre_archivo: string;
    @Column({nullable: true})
    url: string;
    @Column({nullable: true})
    public_id: string;
}
