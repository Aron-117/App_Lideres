import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
export class CreateArchivoTareaDto {
    @Type(() => Number)
    @IsInt()
    id_tarea: number;
}
