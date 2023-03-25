import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllItems() {
    return this.productsService.getAllProducts();
  }

  @Get('/:uuid')
  getItem(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.productsService.getProductById(uuid);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  postNewItem(@Body() product: ProductDto) {
    return this.productsService.addNewProduct(product);
  }

  @Patch('/:uuid')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  patchItem(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() product: ProductDto,
  ) {
    return this.productsService.updateProduct(uuid, product);
  }

  @Delete('/:uuid')
  @HttpCode(204)
  deleteItem(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.productsService.deleteProduct(uuid);
  }
}
