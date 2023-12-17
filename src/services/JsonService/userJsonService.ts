import { IExistingUser } from "../../models";
import IJsonService from "./IJsonservice";

export default class userJsonService implements IJsonService {


    constructor() {

    }

    convertToListJson(Object: IExistingUser[]): any[] {
        const json: any[] = [];
        for (let i = 0; i < Object.length; i++) {
            json[i] = this.convertToJson(Object[i]);
        }
        return json;
    }

    ParseListJson(json: any[]): IExistingUser[] {
        const users: IExistingUser[] = [];
        for (let i = 0; i < json.length; i++) {
            users[i] = this.ParseJson(json[i]);
        }
        return users;
    }

    ParseJson(json: any): IExistingUser {
        return {
            id: json._id,
            fullName: json.fullName || "",
            phone: json.phone || "",
            avatar: json.avatar || "",
            isDriver: json.isDriver || false,
            isActive: json.isActive || false,
            isAdmin: json.isAdmin || false,
            isVip: json.isVip || false,
            car: {
                brand: json.car?.brand,
                seatNumber: json.car?.seatNumber,
            },
            coordinate: {
                latitude: json.coordinate?.latitude,
                longitude: json.coordinate?.longitude,
                address: json.coordinate?.address,
            },
            authentication: {
                password: json.authentication?.password,
                salt: json.authentication?.salt,
            },
            deviceToken: json.deviceToken || "",
        };
    }

    convertToJson(Object: IExistingUser): any {
        return JSON.stringify(Object);
    }

}