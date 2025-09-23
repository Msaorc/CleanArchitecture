import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

let sequileze: Sequelize;

beforeEach(async () => {
    sequileze = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true},
    });

    sequileze.addModels([ProductModel]);
    await sequileze.sync();
});

afterAll(async () => {
    await sequileze.close();
});

describe("Test find product integration usecase", () => {
    it("should list a product", async () => {
       const productRepository = new ProductRepository();
       const useCase = new ListProductUseCase(productRepository);       
       const product1 = new Product("1", "Carretilha marine", 650);
       const product2 = new Product("2", "Carretilha tatula", 1300);
       await productRepository.create(product1);
       await productRepository.create(product2);
       const output = await useCase.execute({});
       expect(output.products.length).toBe(2)
       expect(output.products[0].id).toBe(product1.id);
       expect(output.products[0].name).toBe(product1.name);
       expect(output.products[0].price).toBe(product1.price);
       expect(output.products[1].id).toBe(product2.id);
       expect(output.products[1].name).toBe(product2.name);
       expect(output.products[1].price).toBe(product2.price);
    });
});