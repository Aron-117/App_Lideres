/* eslint-disable prettier/prettier */
import { IsDateString, IsInt, IsString, MinLength } from 'class-validator';

export class CreateTareaDto {
    @IsString()
    @MinLength(3)
    nombre: string;
    @IsString()
    descripcion: string;
    @IsDateString()
    fecha_entrega: Date;
    @IsInt()
    id_curso: number;
}
