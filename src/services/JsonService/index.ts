import userJsonService from "./userJsonService";
import orderJsonService from "./orderJsonService";
import IJsonService from "./IJsonservice";

export class JsonServiceFactory {
    static createData(type: "user" | "order"): IJsonService {
        // Logic to create and return a new instance of JsonService
        if (type === "user") {
            return new userJsonService();
        } else if (type === "order") {
            return new orderJsonService();
        } else {
            throw new Error("Invalid type!");
        }

    }
}