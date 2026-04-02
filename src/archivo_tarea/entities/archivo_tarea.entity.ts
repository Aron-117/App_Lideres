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
    @ManyToOne(() => Tarea, tarea => tarea.archivos)
    @JoinColumn({ name: 'id_tarea' })
    tarea: Tarea;
    @Column({ length: 255 })
    nombre_archivo: string;
}