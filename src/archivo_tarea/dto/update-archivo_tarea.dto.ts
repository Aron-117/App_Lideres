import { PartialType } from '@nestjs/mapped-types';
import { CreateArchivoTareaDto } from './create-archivo_tarea.dto';

export class UpdateArchivoTareaDto extends PartialType(CreateArchivoTareaDto) {}
