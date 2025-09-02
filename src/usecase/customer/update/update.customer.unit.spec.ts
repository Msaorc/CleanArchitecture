import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "Tiao",
    new Address("Rua glicerina patati", 523, "17000-255", "Glicerio")
);

const input = {
    id: customer.id,
    name: "Bernardo",
    address: {
        street: "Angelo marconato",
        number: 270,
        zip: "17523-470",
        city: "Bauru",
    },
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}

describe("Unit test for customer update use case", () => {

    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase= new UpdateCustomerUseCase(customerRepository);
        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    })
})