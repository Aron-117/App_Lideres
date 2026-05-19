/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  Max,
  Min,
} from "class-validator";

export class CreateEntregaDto {
  @IsInt()
  id_tarea: number;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  calificacion?: number;

  @IsOptional()
  @IsString()
  comentario_profesor?: string;
}