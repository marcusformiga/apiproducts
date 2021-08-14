import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  readonly name: string;
  @IsString()
  @ApiProperty()
  readonly description: string;
  @IsString()
  @ApiProperty()
  readonly imageUrl: string;
  @IsNumber()
  @ApiProperty()
  readonly price: number;
  @IsNumber()
  @ApiProperty()
  readonly quantity: number;
  readonly created_at: Date;
}
