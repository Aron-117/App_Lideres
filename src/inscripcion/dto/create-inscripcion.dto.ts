import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateInscripcionDto {
    @IsInt()
    id_usuario: number;
    @IsInt()
    id_curso: number;
    @IsDateString()
    fecha_inscripcion: Date;
    @IsString()
    estado: string;
}
