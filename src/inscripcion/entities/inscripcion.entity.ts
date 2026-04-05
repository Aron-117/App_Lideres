import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Curso } from 'src/curso/entities/curso.entity';

/* eslint-disable prettier/prettier */
@Entity()
export class Inscripcion {
    @PrimaryGeneratedColumn()
    id_inscripcion: number;
    @ManyToOne(() => Usuario, usuario => usuario.inscripciones)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario
    @ManyToOne(() => Curso, curso => curso.inscripciones,{
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_curso' })
    curso: Curso;
    @Column()
    fecha_inscripcion: Date;
    @Column({ length: 50 })
    estado: string;
}
