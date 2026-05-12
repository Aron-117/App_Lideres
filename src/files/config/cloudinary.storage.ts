import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';

export const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const finalName = `${file.fieldname}-${uniqueSuffix}-${sanitizedName}`;
    const isImage = file.mimetype.startsWith('image/');
    const isVideo = file.mimetype.startsWith('video/');
    return {
      folder: 'uploads',
      public_id: finalName,
      resource_type: isImage ? 'image' : isVideo ? 'video' : 'raw',
    };
  },
});
