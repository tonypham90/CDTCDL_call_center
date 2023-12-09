import { IExistingOrder } from "models/interface";
import axios from 'axiosConfig';
import ServiceUser from "./ServiceUser";

export default class ServiceOrder {
    order: IExistingOrder | null = null;
    passenger: ServiceUser | null = null;
    driver: ServiceUser | null = null;
    constructor(order: IExistingOrder) {
        this.initialize(order);
    }

    async initialize(addOrder: IExistingOrder) {
        this.order = addOrder;
        if (!this.order) return;
        this.passenger = new ServiceUser(this.order.passengerId);
        if (this.order.driverId)
            this.driver = new ServiceUser(this.order.driverId);
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

