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
import cloudinary from './config/cloudinary.config';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  uploadFile(@UploadedFile() file) {
    const nombre = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    const resourceType =
      file.mimetype.startsWith('image/')
      ? 'image'
        : file.mimetype.startsWith('video/')
        ? 'video'
        : 'raw';
    return {
      filename: nombre,
      url: file.path,
      publicId: file.filename,
      resourceType,
    };
  }

  @Get('download/:publicId')
  async downloadFile(
    @Param('publicId') publicId: string,
    @Res() res: Response,
  ) {
    const url = cloudinary.url(publicId, {
      resource_type: 'auto',
      secure: true,
      flags: 'attachment',
    });
    return res.redirect(url);
  }
}
