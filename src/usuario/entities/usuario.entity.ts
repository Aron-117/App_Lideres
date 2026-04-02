import { Curso } from 'src/curso/entities/curso.entity';
import { Entrega } from 'src/entrega/entities/entrega.entity';
import { Inscripcion } from 'src/inscripcion/entities/inscripcion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id_usuario: number;
    @Column()
    nombre: string;
    @Column()
    correo: string;
    @Column()
    pasword: string;
    @Column()
    rol: string;
    @Column()
    fecha_registro: Date;
    @OneToMany(() => Inscripcion, inscripcion => inscripcion.usuario)
    inscripciones: Inscripcion[];
    @OneToMany(() => Curso, curso => curso.profesor)
    cursos: Curso[];
    @OneToMany(() => Entrega, entrega => entrega.usuario)
    entregas: Entrega[];
}
