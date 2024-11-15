import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  imageFile: Express.Multer.File;

  @ApiProperty()
  textData: string;
} 