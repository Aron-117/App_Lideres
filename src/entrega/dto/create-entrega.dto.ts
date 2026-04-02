/* eslint-disable prettier/prettier */
import { IsDateString, IsDecimal, IsInt, IsString, } from "class-validator";
export class CreateEntregaDto {
    @IsInt()
    id_tarea: number;
    @IsInt()
    id_usuario: number;
    @IsDateString()
    fecha_entrega: Date;
    @IsDecimal()
    calificacion: number;
    @IsString()
    comentario_profesor: string;
}
