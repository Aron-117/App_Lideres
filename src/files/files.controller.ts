import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

import { storage } from './config/cloudinary.storage';
import { FilesService } from './files.service'; // 👇 Importamos el servicio

@Controller('files')
export class FilesController {
  // 👇 Inyectamos el servicio en el constructor
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  uploadFile(@UploadedFile() file) {
    return this.filesService.formatUploadedFileData(file);
  }

  @Get('download/:publicId')
  downloadFile(@Param('publicId') publicId: string, @Res() res: Response) {
    const url = this.filesService.getDownloadUrl(publicId);
    return res.redirect(url);
  }
}
