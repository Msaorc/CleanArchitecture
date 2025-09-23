import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import FindProductUseCase from "./find.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("Test find product use case", () => {
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

    it("should find a product integration usecase", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);
        const product = new Product("123", "Carretilha", 650)
        await productRepository.create(product);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Carretilha",
            price: 650
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
})