import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import UpdateProductUseCase from "./update.product.usecase";

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

const product = new Product("123", "Carretilha marine", 500);

const input = {
    id: product.id,
    name: "Carretilha bronx",
    price: 350
}

describe("Test update product integration usecase", () => {
    it("should update a product", async () => {
        const productRespository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRespository);
        await productRespository.create(product);
        const output = await usecase.execute(input);
        expect(output).toEqual(input);
    });
});
