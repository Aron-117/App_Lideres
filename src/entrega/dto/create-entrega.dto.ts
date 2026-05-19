/* eslint-disable prettier/prettier */
import {
  IsDecimal,
  IsInt,
  IsString,
  IsOptional,
} from "class-validator";

export class CreateEntregaDto {
  @IsInt()
  id_tarea: number;

  @IsOptional()
  @IsDecimal()
  calificacion?: number;

  @IsOptional()
  @IsString()
  comentario_profesor?: string;
}