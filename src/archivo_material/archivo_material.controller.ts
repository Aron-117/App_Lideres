import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArchivoMaterialService } from './archivo_material.service';
import { CreateArchivoMaterialDto } from './dto/create-archivo_material.dto';
import { UpdateArchivoMaterialDto } from './dto/update-archivo_material.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/files/config/cloudinary.storage';
@Controller('archivo-material')
export class ArchivoMaterialController {
  constructor(
    private readonly archivoMaterialService: ArchivoMaterialService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  create(
    @UploadedFile() file,
    @Body() createArchivoMaterialDto: CreateArchivoMaterialDto,
  ) {
    return this.archivoMaterialService.create(createArchivoMaterialDto, {
      nombre_archivo: file.originalname,
      url: file.path,
      public_id: file.filename,
    });
  }

  @Get()
  findAll() {
    return this.archivoMaterialService.findAll();
  }
  @Get('material/:id')
  findByMaterial(@Param('id') idMaterial: string) {
    return this.archivoMaterialService.findByMaterial(+idMaterial);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const archivo = await this.archivoMaterialService.findOne(+id);
    return archivo;
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
