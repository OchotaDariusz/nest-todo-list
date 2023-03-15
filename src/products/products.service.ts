import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities';
import { Product } from './interfaces/product.interface';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException("Can't find that product.");
    }
    return product;
  }

  async addNewProduct(product: ProductDto): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async updateProduct(id: string, product: ProductDto): Promise<Product> {
    const productToUpdate = await this.productRepository.findOneBy({ id });
    if (!productToUpdate) {
      throw new NotFoundException("Can't find product to update.");
    }
    productToUpdate.name = product.name;
    return await this.productRepository.save(productToUpdate);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException("Can't find product to delete.");
    }
    await this.productRepository.delete(id);
  }
}
