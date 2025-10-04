import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductYupValidatorFactory {
    static create() {
        return new ProductYupValidator();
    }
}