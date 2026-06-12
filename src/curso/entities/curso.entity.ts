import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { Material } from 'src/material/entities/material.entity';
import { Inscripcion } from 'src/inscripcion/entities/inscripcion.entity';
/* eslint-disable prettier/prettier */
@Entity()
export class Curso {
    @PrimaryGeneratedColumn()
    id_curso: number;
    @Column({ length: 255 })
    nombre: string;
    @Column({ length: 1000 })
    descripcion: string;
    @Column()
    fecha_inicio: Date;
    @Column()
    fecha_fin: Date;
    @Column()
    cupos: number;
    @Column()
    @DeleteDateColumn()
    eliminadoEn: Date;
    @ManyToOne(() => Usuario, usuario => usuario.id_usuario, {onDelete: 'SET NULL'})
    @JoinColumn({ name: 'id_usuario' })
    profesor: Usuario;
    @OneToMany(() => Tarea, tarea => tarea.curso)
    tareas: Tarea[];
    @OneToMany(() => Material, material => material.curso)
    materiales: Material[];
    @OneToMany(() => Usuario, usuario => usuario.cursos)
    estudiantes: Usuario[];
    @OneToMany(() => Inscripcion, inscripcion => inscripcion.curso)
    inscripciones: Inscripcion[];
}
