import IJsonService from "./IJsonservice";
import { IExistingOrder } from "../../models/interface";

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
            car: {
                brand: json.car?.brand,
                seatNumber: json.car?.seatNumber,
            },
            connections: json.connections || [],
            departure: {
                address: json.departure?.address,
                latitude: json.departure?.latitude,
                longitude: json.departure?.longitude,
            },
            destination: {
                address: json.destination?.address,
                latitude: json.destination?.latitude,
                longitude: json.destination?.longitude,
            },
            driverId: json.driverId || "",
            id: json._id,
            isVip: json.isVip || false,
            logs: json.logs || [],
            note: json.note || "",
            passengerId: json.passengerId || "",
            scheduledTime: json.scheduledTime || "",
            status: json.status || "",
        };
        return order;
    }
}