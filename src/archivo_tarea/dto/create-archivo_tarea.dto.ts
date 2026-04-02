import { IsInt, IsString } from 'class-validator';
export class CreateArchivoTareaDto {
    @IsInt()
    id_tarea: number;
    @IsString()
    nombre_archivo: string;
}
