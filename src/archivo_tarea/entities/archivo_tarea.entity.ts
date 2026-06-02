import { Tarea } from 'src/tarea/entities/tarea.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class ArchivoTarea {
    @PrimaryGeneratedColumn()
    id_archivo: number;
    @ManyToOne(() => Tarea, tarea => tarea.archivos, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_tarea' })
    tarea: Tarea;
    @Column({ length: 255 })
    nombre_archivo: string;
    @Column()
    url: string;
    @Column()
    public_id: string;
    @Column({default: 'raw'})
    resource_type: string;
}