import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]) // Import này rất quan trọng
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {} 