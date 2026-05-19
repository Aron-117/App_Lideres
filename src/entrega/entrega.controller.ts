import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { EntregaService } from './entrega.service';
import { CreateEntregaDto } from './dto/create-entrega.dto';
import { UpdateEntregaDto } from './dto/update-entrega.dto';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService) {}

  @Post()
  create(@Body() createEntregaDto: CreateEntregaDto, @Req() req) {
    return this.entregaService.create(createEntregaDto, req.user?.sub);
  }

  @Get()
  findAll() {
    return this.entregaService.findAll();
  }
  @Get('tarea/:id')
  findEntregaPersonal(@Param('id') id: number, @Req() req) {
    return this.entregaService.findPersonalTarea(+id, req.user?.sub);
  }
  @Get('tarea/:id/todas')
  findAllByTarea(@Param('id') id: number) {
    return this.entregaService.findAllByTarea(+id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntregaDto: UpdateEntregaDto) {
    return this.entregaService.update(+id, updateEntregaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregaService.remove(+id);
  }
}
