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
} from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class Entrega {
    @PrimaryColumn()
    id_entrega: number;
    @ManyToOne(() => Tarea, tarea => tarea.entregas)
    @JoinColumn({ name: 'id_tarea' })
    tarea: Tarea;
    @ManyToOne(() => Usuario, usuario => usuario.entregas)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
    @Column()
    fecha_entrega: Date;
    @Column()
    calificacion: number;
    @Column({ length: 1000 })
    comentario_profesor: string;
    @OneToMany(() => ArchivoEntrega, archivoEntrega => archivoEntrega.entrega)
    archivos: ArchivoEntrega[];
}
