import IJsonService from "./IJsonservice";
import {IExistingOrder} from "../../models/interface";

export default class orderJsonService implements IJsonService {
    constructor() {
    }

    convertToListJson(Object: IExistingOrder[]): any[] {
        const json: any[] = [];
        for (let i = 0; i < Object.length; i++) {
            json[i] = this.convertToJson(Object[i]);
        }
        return json;
    }

    ParseListJson(json: any[]): IExistingOrder[] {
        const orders: IExistingOrder[] = [];
        for (let i = 0; i < json.length; i++) {
            orders[i] = this.ParseJson(json[i]);
        }
        return orders;
    }


    public convertToJson(Object: IExistingOrder): any {
        return JSON.stringify(Object);
    }

    public ParseJson(json: any): IExistingOrder {
        let order: IExistingOrder;
        order = {
            car: json.car,
            connections: json.connections,
            departure: json.departure,
            destination: json.destination,
            driverId: json.driverId,
            id: json.id,
            isVip: json.isVip,
            logs: json.logs,
            note: json.note,
            passengerId: json.passengerId,
            scheduledTime: json.scheduledTime,
            status: json.status
        };
        return order;
    }
}