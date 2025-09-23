import Product from '../../../domain/product/entity/product';
import ProductInterface from '../../../domain/product/entity/product.interface';
import ProductFactory from '../../../domain/product/factory/product.factory';
import ProductRespositoryInterface from '../../../domain/product/repository/product.repository';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';

export default class CreateProductUseCase {
    private productRepository: ProductRespositoryInterface;

    constructor(productRepository: ProductRespositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        var productInterface = ProductFactory.create(input.type, input.name, input.price);
        var productEntity = ProductMapper.toEntity(productInterface);
        
        await this.productRepository.create(productEntity);

        return {
            id: productEntity.id,
            name: productEntity.name,
            price: productEntity.price
        }
    }
}

class ProductMapper {
  static toEntity(product: ProductInterface): Product {
    return new Product(product.id, product.name, product.price);
  }
}