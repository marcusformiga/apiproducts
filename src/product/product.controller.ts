import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  @ApiOperation({
    summary: 'Pega todos os produtos cadastrados na base de dados',
  })
  @ApiResponse({
    status: 200,
    description: 'Exibe todos os produtos cadastrados',
  })
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Cria um novo produto ao passar dados válidos',
  })
  @ApiOperation({ summary: 'Cria um novo produto' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retorna um item' })
  @ApiOperation({ summary: 'Lista um único produto ao informar um id válido' })
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Remove um produto ao passar um dado válido',
  })
  @ApiOperation({ summary: 'Remove um único produto ao informar um id válido' })
  async removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza dados de um produto já cadastrado' })
  @ApiResponse({
    status: 200,
    description: 'Atualização de um produto ao passar dados válidos',
  })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }
}
