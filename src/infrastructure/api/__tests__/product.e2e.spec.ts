import request from "supertest"
import {app, sequelize } from "../express";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 100,
                type: "a"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(100);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1"
            });
        
        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response1 = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 100,
                type: "a"
            });
        expect(response1.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                price: 200,
                type: "b"
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app)
            .get("/product")
            .send();
        
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product1 = listResponse.body.products.find((p: any) => p.id === response1.body.id);
        expect(product1).toBeDefined();
        expect(product1.name).toBe("Product 1");
        expect(product1.price).toBe(100);

        const product2 = listResponse.body.products.find((p: any) => p.id === response2.body.id);
        expect(product2).toBeDefined();
        expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(400);
    });
});