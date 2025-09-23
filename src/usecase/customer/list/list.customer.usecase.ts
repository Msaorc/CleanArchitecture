import Customer from "../../../domain/customer/entity/customer";
import CustomerRespositoryInterface from "../../../domain/customer/repository/customer.repository";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";


export default class ListCustomerUseCase {
    private customerRepository: CustomerRespositoryInterface;

    constructor(customerRepository: CustomerRespositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
        return {
            customers: customer.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city,
                }
            })),
        }
    }
}