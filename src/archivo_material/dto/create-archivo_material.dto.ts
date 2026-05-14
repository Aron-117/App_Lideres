import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateArchivoMaterialDto {
    @Type(() => Number)
    @IsInt()
    id_material: number;

}
