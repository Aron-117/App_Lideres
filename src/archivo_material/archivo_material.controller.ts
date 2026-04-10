import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, NotFoundException, Res } from '@nestjs/common';
import { ArchivoMaterialService } from './archivo_material.service';
import { CreateArchivoMaterialDto } from './dto/create-archivo_material.dto';
import { UpdateArchivoMaterialDto } from './dto/update-archivo_material.dto';
import * as path from 'path';
import * as fs from 'fs';
@Controller('archivo-material')
export class ArchivoMaterialController {
  constructor(private readonly archivoMaterialService: ArchivoMaterialService) {}

  @Post()
  create(
    @UploadedFile() file,
    @Body() createArchivoMaterialDto: CreateArchivoMaterialDto,
  ) {
    return this.archivoMaterialService.create(createArchivoMaterialDto, file);
  }

  @Get()
  findAll() {
    return this.archivoMaterialService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const archivo = await this.archivoMaterialService.findOne(+id);
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
    @Body() updateArchivoMaterialDto: UpdateArchivoMaterialDto,
  ) {
    return this.archivoMaterialService.update(+id, updateArchivoMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoMaterialService.remove(+id);
  }
}
