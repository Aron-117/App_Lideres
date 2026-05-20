import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateInscripcionDto {
    @IsInt()
    id_usuario: number;
    @IsInt()
    id_curso: number;
    @IsString()
    estado: string;
}
