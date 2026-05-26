import { ArchivoTarea } from 'src/archivo_tarea/entities/archivo_tarea.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { Entrega } from 'src/entrega/entities/entrega.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class Tarea {
    @PrimaryGeneratedColumn()
    id_tarea: number;
    @ManyToOne(() => Curso, curso => curso.tareas,{onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_curso' })
    curso: Curso;
    @Column({ length: 255 })
    titulo: string;
    @Column({ length: 1000 })
    descripcion: string;
    @Column()
    fecha_publicacion: Date;
    @Column()
    fecha_entrega: Date;
    @Column()
    calificacion: number;
    @OneToMany(() => Entrega, entrega => entrega.tarea)
    entregas: Entrega[];
    @OneToMany(() => ArchivoTarea, archivoTarea => archivoTarea.tarea)
    archivos: ArchivoTarea[];
}
