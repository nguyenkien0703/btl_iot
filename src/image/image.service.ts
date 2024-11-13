import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  async uploadImage(file: Express.Multer.File) {
    // Tạo thư mục uploads nếu chưa tồn tại
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Tạo tên file duy nhất
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Lưu file vào thư mục uploads
    fs.writeFileSync(filePath, file.buffer);

    return {
      success: true,
      filename: uniqueFileName,
      path: filePath,
      mimetype: file.mimetype
    };
  }

  getImagePath(filename: string) {
    const filePath = path.join('uploads', filename);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    return filePath;
  }
} 