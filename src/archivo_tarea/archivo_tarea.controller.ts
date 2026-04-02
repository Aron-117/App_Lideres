import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArchivoTareaService } from './archivo_tarea.service';
import { CreateArchivoTareaDto } from './dto/create-archivo_tarea.dto';
import { UpdateArchivoTareaDto } from './dto/update-archivo_tarea.dto';

@Controller('archivo-tarea')
export class ArchivoTareaController {
  constructor(private readonly archivoTareaService: ArchivoTareaService) {}

  @Post()
  create(@Body() createArchivoTareaDto: CreateArchivoTareaDto) {
    return this.archivoTareaService.create(createArchivoTareaDto);
  }

  @Get()
  findAll() {
    return this.archivoTareaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivoTareaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchivoTareaDto: UpdateArchivoTareaDto) {
    return this.archivoTareaService.update(+id, updateArchivoTareaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoTareaService.remove(+id);
  }
}
