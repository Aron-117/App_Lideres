import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LogAcceso {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    usuario: string;
    @Column()
    ip: string;
    @Column()
    evento: string;
    @Column()
    browser: string;
    @Column()
    fecha: Date;
}
