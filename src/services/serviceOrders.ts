import { IExistingOrder } from "models/interface";
import ServiceOrder from "./ServiceOrder";
import axios from "axiosConfig";

export default class ServiceOrders {
    listOrder: ServiceOrder[] = [];
    constructor(data: IExistingOrder[]) {
        this.initialize(data);
    }

    async initialize(data: IExistingOrder[]) {
        this.listOrder = data.map((order: IExistingOrder) => new ServiceOrder(order.id));
    }

}