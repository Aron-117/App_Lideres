/* eslint-disable prettier/prettier */
import { IsDateString, IsInt, IsString, MinLength } from 'class-validator';

export class CreateMaterialDto {
    @IsString()
    @MinLength(3)
    titulo: string;
    @IsString()
    descripcion: string;
    @IsDateString()
    fecha_subida: Date;
    @IsInt()
    id_curso: number;
}
