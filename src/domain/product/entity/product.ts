import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductYupValidatorFactory from "../factory/product.validator.fatory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {

    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    validate(){
        ProductYupValidatorFactory.create().validate(this);
    }

    changeName(name: string){
        this._name = name;
    }

    changePrice(price: number) {
        this._price = price;
    }
}