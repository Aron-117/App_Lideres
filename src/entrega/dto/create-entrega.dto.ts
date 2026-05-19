/* eslint-disable prettier/prettier */
import { IsDateString, IsDecimal, IsInt, IsString, } from "class-validator";
export class CreateEntregaDto {
    @IsInt()
    id_tarea: number;
    @IsDecimal()
    calificacion?: number;
    @IsString()
    comentario_profesor?: string;
}
