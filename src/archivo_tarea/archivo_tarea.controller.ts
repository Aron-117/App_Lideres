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
} from '@nestjs/common';
import { ArchivoTareaService } from './archivo_tarea.service';
import { CreateArchivoTareaDto } from './dto/create-archivo_tarea.dto';
import { UpdateArchivoTareaDto } from './dto/update-archivo_tarea.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/files/config/cloudinary.storage';
@Controller('archivo-tarea')
export class ArchivoTareaController {
  constructor(private readonly archivoTareaService: ArchivoTareaService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  create(
    @UploadedFile() file,
    @Body() createArchivoTareaDto: CreateArchivoTareaDto,
  ) {
    return this.archivoTareaService.create(createArchivoTareaDto, {
      nombre_archivo: file.originalname,
      url: file.path,
      public_id: file.filename,
    });
  }

  @Get()
  findAll() {
    return this.archivoTareaService.findAll();
  }
  @Get('tarea/:id')
  findByTarea(@Param('id') idTarea: string) {
    return this.archivoTareaService.findByTarea(+idTarea);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.archivoTareaService.findOne(+id);
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
