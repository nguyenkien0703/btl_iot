import { } from '@nestjs/typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_address: string;

  @Column()
  textData: string;
} 