import { IsDateString, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateCursoDto {
    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
    @IsDateString()
    fecha_inicio: Date;
    @IsDateString()
    fecha_fin: Date;
    @IsInt()
    @IsPositive()
    cupos: number;
    @IsInt()
    id_profesor: number;
}
