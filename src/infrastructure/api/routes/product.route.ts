import express from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';

export const productRoute = express.Router();

productRoute.post("/", async (req, res) => {
    const productUsecase = new CreateProductUseCase(new ProductRepository());
    try {
        const productDto = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type
        };
        const product = await productUsecase.execute(productDto);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get("/", async (req, res) => {
    const productUseCase = new ListProductUseCase(new ProductRepository());
    try {
        const products = await productUseCase.execute({});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});