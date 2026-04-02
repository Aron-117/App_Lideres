import { PartialType } from '@nestjs/mapped-types';
import { CreateArchivoEntregaDto } from './create-archivo_entrega.dto';

export class UpdateArchivoEntregaDto extends PartialType(CreateArchivoEntregaDto) {}
