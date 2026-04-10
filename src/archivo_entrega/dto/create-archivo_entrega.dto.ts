import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
export class CreateArchivoEntregaDto {
    @Type(() => Number)
    @IsInt()
    id_entrega: number;
}
