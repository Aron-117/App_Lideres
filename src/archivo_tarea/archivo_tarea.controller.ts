import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { ArchivoTareaService } from './archivo_tarea.service';
import { CreateArchivoTareaDto } from './dto/create-archivo_tarea.dto';
import { UpdateArchivoTareaDto } from './dto/update-archivo_tarea.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
@Controller('archivo-tarea')
export class ArchivoTareaController {
  constructor(private readonly archivoTareaService: ArchivoTareaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file,
    @Body() createArchivoTareaDto: CreateArchivoTareaDto,
  ) {
    return this.archivoTareaService.create(createArchivoTareaDto, file);
  }

  @Get()
  findAll() {
    return this.archivoTareaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const archivo = await this.archivoTareaService.findOne(+id);
    if (!archivo) {
      throw new NotFoundException('Archivo no encontrado');
    }
    const filePath = path.join(
      process.cwd(),
      'uploads',
      archivo.nombre_archivo,
    );
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Archivo no encontrado');
    }
    return res.download(filePath);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArchivoTareaDto: UpdateArchivoTareaDto,
  ) {
    return this.archivoTareaService.update(+id, updateArchivoTareaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoTareaService.remove(+id);
  }
}
