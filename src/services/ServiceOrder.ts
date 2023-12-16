import { IExistingOrder } from "models/interface";
import axios from 'axiosConfig';
import ServiceUser from "./ServiceUser";
import { IExistingUser } from "models";
import { UserBuilder } from './builder';

export default class ServiceOrder {
    order: IExistingOrder | null = null;
    passenger: IExistingUser | null = null;
    driver: IExistingUser | null = null;
    private userbuilder: UserBuilder = new UserBuilder();
    constructor(order: IExistingOrder) {
        this.initialize(order);
    }

    async initialize(addOrder: IExistingOrder) {
        this.order = addOrder;
        if (!this.order) return;
        this.passenger = this.userbuilder.setId(this.order.passengerId).build();
        if (this.order.driverId)
            this.driver = this.userbuilder.setId(this.order.driverId).build();
    }

    get id() {
        return this.order?.id;
    }

    async getHistory() {
        const { data } = await axios.post(`/users/orders`, { passengerId: this.id });
        return data as IExistingOrder[];
    }
}

function getOrder(id: string): IExistingOrder | PromiseLike<IExistingOrder | null> | null {
    return axios.get(`/orders/${id}`);
}

