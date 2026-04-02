import { IsInt, IsString } from 'class-validator';
export class CreateArchivoMaterialDto {
    @IsInt()
    id_material: number;
    @IsString()
    nombre_archivo: string;

}
