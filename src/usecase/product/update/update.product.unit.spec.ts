import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Carretilha marine", 500);

const input = {
    id: product.id,
    name: "Carretilha bronx",
    price: 350
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
    }
}

describe("Unit test for product update usecase", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase= new UpdateProductUseCase(productRepository);
        const output = await productUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    })
})