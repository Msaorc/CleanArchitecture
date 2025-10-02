import Product from "./product";

describe("Order unit testes", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrow("product: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("123", "", 250);
        }).toThrow("product: Name is required");
    });

    it("should throw error when id and name are empty", () => {
        expect(() => {
            let product = new Product("", "", 250);
        }).toThrow("product: Id is required, product: Name is required");
    });
    
    it("should throw error when price is less than zero", () => {
        expect(() => {
            let product = new Product("123", "Product 1", 0);
        }).toThrow("product: Price must be greater than zero");
    });

    it("should throw error when price is negative", () => {
        expect(() => {
            let product = new Product("123", "Product 1", -20);
        }).toThrow("product: Price cannot be negative");
    });

    it("should change name", () => {
        let product = new Product("123", "Product 1", 350);
        product.changeName("Product 2")
        expect(product.name).toEqual("Product 2");
    });

    it("should change price", () => {
        let product = new Product("123", "Product 1", 350);
        product.changePrice(175)
        expect(product.price).toEqual(175);
    });    
});