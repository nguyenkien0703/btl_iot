import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { Image } from './image.entity';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('post_data.php')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imageFile', {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    }
  }))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: { textData: string }
  ) {
    return this.imageService.uploadImage(file, uploadDto.textData);
  }
}
