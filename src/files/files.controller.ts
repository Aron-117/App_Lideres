import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    const nombre = file.filename;
    nombre.replace(/[^a-zA-Z0-9.]/g, '_');
    return {
      filename: nombre
    };
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res) {
    if (filename.includes('..')) {
      return res.status(400).send('Invalid filename');
    }
    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }
    return res.download(filePath);
  }
}
