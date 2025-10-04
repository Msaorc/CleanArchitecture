import express from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import e from 'express';
import CustomerPresenter from '../presenters/customer.presenter';
import { json } from 'sequelize';

export const customerRoute = express.Router();
customerRoute.post("/", async (req, res) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                zip: req.body.address.zip,
                city: req.body.address.city
            }
        };
        const customer = await usecase.execute(customerDto);
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});

customerRoute.get("/", async (req, res) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const customers = await usecase.execute({});
        res.format({
            json: () => res.status(200).send(customers),
            xml: () => res.type('application/xml').status(200).send(CustomerPresenter.toXML(customers)),
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
