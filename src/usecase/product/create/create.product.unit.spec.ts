import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "productA",
    price: 20,
    type: "a"
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test create product usecase", () => {

    it("should thrown an error when name is missing", async () => {
        var input = {
            name: "product name",
            price: 20,
            type: "a"
        }

        var productRepository = MockRepository();
        var createProductUseCase = new CreateProductUseCase(productRepository);
        input.name = "";

        expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when price equal to zero", async () => {
        var input = {
            name: "product zero",
            price: 20,
            type: "a"
        }

        var productRepository = MockRepository();
        var createProductUseCase = new CreateProductUseCase(productRepository);
        input.price = 0;

        expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });

    it("should thrown an error when price less than zero", async () => {
        var input = {
            name: "product less zero",
            price: 20,
            type: "a"
        }

        var productRepository = MockRepository();
        var createProductUseCase = new CreateProductUseCase(productRepository);
        input.price = -20;

        expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Price cannot be negative"
        );
    });
});