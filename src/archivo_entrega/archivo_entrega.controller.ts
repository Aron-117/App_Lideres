import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArchivoEntregaService } from './archivo_entrega.service';
import { CreateArchivoEntregaDto } from './dto/create-archivo_entrega.dto';
import { UpdateArchivoEntregaDto } from './dto/update-archivo_entrega.dto';

@Controller('archivo-entrega')
export class ArchivoEntregaController {
  constructor(private readonly archivoEntregaService: ArchivoEntregaService) {}

  @Post()
  create(@Body() createArchivoEntregaDto: CreateArchivoEntregaDto) {
    return this.archivoEntregaService.create(createArchivoEntregaDto);
  }

  @Get()
  findAll() {
    return this.archivoEntregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivoEntregaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchivoEntregaDto: UpdateArchivoEntregaDto) {
    return this.archivoEntregaService.update(+id, updateArchivoEntregaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoEntregaService.remove(+id);
  }
}
