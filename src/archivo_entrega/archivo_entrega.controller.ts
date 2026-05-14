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
  Res,
} from '@nestjs/common';
import { ArchivoEntregaService } from './archivo_entrega.service';
import { CreateArchivoEntregaDto } from './dto/create-archivo_entrega.dto';
import { UpdateArchivoEntregaDto } from './dto/update-archivo_entrega.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/files/config/cloudinary.storage';

@Controller('archivo-entrega')
export class ArchivoEntregaController {
  constructor(private readonly archivoEntregaService: ArchivoEntregaService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  create(
    @UploadedFile() file,
    @Body() createArchivoEntregaDto: CreateArchivoEntregaDto,
  ) {
    return this.archivoEntregaService.create(createArchivoEntregaDto, {
      nombre_archivo: file.originalname,
      url: file.path,
      public_id: file.filename,
    });
  }

  @Get()
  findAll() {
    return this.archivoEntregaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.archivoEntregaService.findOne(+id);
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
