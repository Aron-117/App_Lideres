import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { RolesGuard } from 'src/auth/decorators/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}

  @Post()
  @Roles('Estudiante')
  create(@Body() createEntregaDto: CreateEntregaDto, @Req() req) {
    return this.entregaService.create(createEntregaDto, req.user?.sub);
  }

  @Get()
  @Roles('Admin', 'Profesor')
  findAll() {
    return this.entregaService.findAll();
  }
  @Get('tarea/:id')
  @Roles('Estudiante', 'Admin')
  findEntregaPersonal(@Param('id') id: number, @Req() req) {
    return this.entregaService.findPersonalTarea(+id, req.user?.sub);
  }
  @Get('tarea/:id/todas')
  @Roles('Profesor', 'Admin')
  findAllByTarea(@Param('id') id: number) {
    return this.entregaService.findAllByTarea(+id);
  }
  @Get(':id')
  @Roles('Admin', 'Profesor')
  findOne(@Param('id') id: string) {
    return this.entregaService.findOne(+id);
  }

  @Patch(':id')
  @Roles('Estudiante', 'Profesor', 'Admin')
  update(@Param('id') id: string, @Body() updateEntregaDto: UpdateEntregaDto) {
    return this.entregaService.update(+id, updateEntregaDto);
  }

  @Delete(':id')
  @Roles('Estudiante', 'Admin')
  remove(@Param('id') id: string) {
    return this.entregaService.remove(+id);
  }
}
