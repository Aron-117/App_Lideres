import { IsInt, IsString } from 'class-validator';
export class CreateArchivoEntregaDto {
    @IsInt()
    id_entrega: number;
    @IsString()
    nombre_archivo: string;
}
