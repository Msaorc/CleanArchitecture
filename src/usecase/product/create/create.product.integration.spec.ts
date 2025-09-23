import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from "./create.product.usecase";

const inputA = {
    name: "productA",
    price: 20,
    type: "a"
}

const inputB = {
    name: "123",
    price: 30,
    type: "b"
}

describe("Test create product integration usecase", () => {
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

    it("should create a product A", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const result = await usecase.execute(inputA);
        expect(result).toEqual({
            id: expect.any(String),
            name: inputA.name,
            price: inputA.price
        });
    });

    it("should create a product B", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const result = await usecase.execute(inputB);
        expect(result).toEqual({
            id: expect.any(String),
            name: inputB.name,
            price: inputB.price * 2
        });
    });

    it("should generate an error when the type is invalid", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product3",
            price: 30,
            type: "c"
        }

        expect(usecase.execute(input)).rejects.toThrow(
            "Product type not supported"
        );
    });
})