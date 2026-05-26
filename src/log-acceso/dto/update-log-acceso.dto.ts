import { PartialType } from '@nestjs/swagger';
import { CreateLogAccesoDto } from './create-log-acceso.dto';

export class UpdateLogAccesoDto extends PartialType(CreateLogAccesoDto) {}
