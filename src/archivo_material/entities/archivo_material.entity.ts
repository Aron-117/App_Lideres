import { Material } from 'src/material/entities/material.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity()
export class ArchivoMaterial {
    @PrimaryGeneratedColumn()
    id_archivo: number;
    @ManyToOne(() => Material, material => material.archivos)
    @JoinColumn({ name: 'id_material' })
    material: Material;
    @Column({ length: 255 })
    nombre_archivo: string;
    @Column({nullable: true})
    url: string;
    @Column({nullable: true})
    public_id: string;
}
