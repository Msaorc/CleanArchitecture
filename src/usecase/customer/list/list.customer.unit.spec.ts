import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import Customer from '../../../domain/customer/entity/customer';
import ListCustomerUseCase from "./list.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "Tiao",
    new Address("Rua glicerina patati", 523, "17000-255", "Glicerio")
);

const customer2 = CustomerFactory.createWithAddress(
    "Jenaro",
    new Address("Rua glicerina patati", 523, "17000-255", "Glicerio")
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve([customer, customer2])),
    }
}

describe("Unit teste for listing customer use case", () => {
    it("should list a customer", async () => {
       const repository = MockRepository() ;
       const useCase = new ListCustomerUseCase(repository);

       const output = await useCase.execute({});

       expect(output.customers.length).toBe(2)
       expect(output.customers[0].id).toBe(customer.id);
       expect(output.customers[0].name).toBe(customer.name);
       expect(output.customers[0].address.street).toBe(customer.Address.street);
       expect(output.customers[1].id).toBe(customer2.id);
       expect(output.customers[1].name).toBe(customer2.name);
       expect(output.customers[1].address.street).toBe(customer2.Address.street);
    });
})