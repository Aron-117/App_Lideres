import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { ArchivoEntregaService } from './archivo_entrega.service';
import { CreateArchivoEntregaDto } from './dto/create-archivo_entrega.dto';
import { UpdateArchivoEntregaDto } from './dto/update-archivo_entrega.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('archivo-entrega')
export class ArchivoEntregaController {
  constructor(private readonly archivoEntregaService: ArchivoEntregaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file,
    @Body() createArchivoEntregaDto: CreateArchivoEntregaDto,
  ) {
    return this.archivoEntregaService.create(createArchivoEntregaDto, file);
  }

  @Get()
  findAll() {
    return this.archivoEntregaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    const archivo = await this.archivoEntregaService.findOne(+id);
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
    @Body() updateArchivoEntregaDto: UpdateArchivoEntregaDto,
  ) {
    return this.archivoEntregaService.update(+id, updateArchivoEntregaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoEntregaService.remove(+id);
  }
}
