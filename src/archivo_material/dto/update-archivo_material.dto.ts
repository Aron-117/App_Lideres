import { PartialType } from '@nestjs/mapped-types';
import { CreateArchivoMaterialDto } from './create-archivo_material.dto';

export class UpdateArchivoMaterialDto extends PartialType(CreateArchivoMaterialDto) {}
