import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }
  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(
        `Produto com id ${id} informado não encontrado`,
      );
    }
    return product;
  }
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productModel.create(createProductDto);
    return product;
  }
  async updateProduct(_id: string, updateProductDto: CreateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(
      _id,
      updateProductDto,
      { new: true, runValidators: true },
    );
    if (!product) {
      throw new NotFoundException(`Produto com id ${_id} não encontrado`);
    }
    return product;
  }
  async removeProduct(_id: string) {
    const product = await this.productModel.findByIdAndDelete(_id);
    if (!product) {
      throw new NotFoundException(
        `Produto com id ${_id} não encontrado, portanto não pode ser removido`,
      );
    }
  }
}
