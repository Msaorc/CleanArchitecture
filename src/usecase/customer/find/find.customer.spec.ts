import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("Test find customer use case", () => {
    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true},
        });

        await sequileze.addModels([CustomerModel]);
        await sequileze.sync();
    });

    afterAll(async () => {
        await sequileze.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);
        const costumer = new Customer("123", "Alexa")
        const address = new Address("Street", 200, "Zip", "City");
        costumer.changeAddress(address);
        await customerRepository.create(costumer);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Alexa",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip",
            }
        }

        const result = usecase.execute(input);
        expect(result).toEqual(output);
    });
})