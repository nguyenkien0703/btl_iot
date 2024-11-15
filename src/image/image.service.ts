import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async uploadImage(file: Express.Multer.File, textData: string) {
    // Tạo tên file độc nhất
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const uploadPath = path.join('uploads', uniqueFileName);

    // Đảm bảo thư mục uploads tồn tại
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }

    // Lưu file
    fs.writeFileSync(uploadPath, file.buffer);

    // Lưu thông tin vào database
    const image = new Image();
    image.image_address = uniqueFileName;
    image.textData = textData;

    return this.imageRepository.save(image);
  }
} 