import CustomerRespositoryInterface from '../../../domain/customer/repository/customer.repository';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import { InputUpdateProductDto, OutputUpdateProductDto } from './update.product.dto';
import ProductRepositoryInterface from '../../../domain/product/repository/product.repository';

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.find(input.id)
        product.changeName(input.name);
        product.changePrice(input.price);
        await this.productRepository.update(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}