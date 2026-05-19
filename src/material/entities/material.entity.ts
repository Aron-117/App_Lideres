import { ArchivoMaterial } from 'src/archivo_material/entities/archivo_material.entity';
import { Curso } from 'src/curso/entities/curso.entity';
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
export class Material {
    @PrimaryGeneratedColumn()
    id_material: number;
    @ManyToOne(() => Curso, (curso)=> curso.materiales, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'id_curso' })
    curso: Curso;
    @Column({ length: 255 })
    titulo: string;
    @Column({ length: 1000, nullable: true })
    descripcion?: string;
    @Column()
    fecha_subida: Date;
    @OneToMany(() => ArchivoMaterial, archivoMaterial => archivoMaterial.material)
    archivos: ArchivoMaterial[];
}
