import { Injectable } from '@nestjs/common';
import cloudinary from './config/cloudinary.config';

@Injectable()
export class FilesService {
  formatUploadedFileData(file: any) {
    const nombre = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    const resourceType = file.mimetype.startsWith('image/')
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

  getDownloadUrl(publicId: string): string {
    return cloudinary.url(publicId, {
      resource_type: 'auto',
      secure: true,
      flags: 'attachment', // Fuerza la descarga en el navegador
    });
  }
  async deleteFile(
    publicId: string,
    resourceType: 'image' | 'video' | 'raw' = 'image',
  ) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
      return result;
    } catch (error) {
      console.error('Error en Cloudinary:', error);
      throw new Error('Fallo al eliminar el archivo físico');
    }
  }
}
