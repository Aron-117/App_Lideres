import { ArchivoEntrega } from 'src/archivo_entrega/entities/archivo_entrega.entity';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class Entrega {
    @PrimaryGeneratedColumn()
    id_entrega: number;
    @ManyToOne(() => Tarea, tarea => tarea.entregas, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_tarea' })
    tarea: Tarea;
    @ManyToOne(() => Usuario, usuario => usuario.entregas, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
    @Column()
    fecha_entrega: Date;
    @Column({ type: 'int', nullable: true})
    calificacion: number;
    @Column({ type: 'varchar', length: 1000, nullable: true })
    comentario_profesor: string;
    @OneToMany(() => ArchivoEntrega, archivoEntrega => archivoEntrega.entrega)
    archivos: ArchivoEntrega[];
}
