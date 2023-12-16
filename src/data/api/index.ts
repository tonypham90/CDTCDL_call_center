// DataFactory.ts
import UserData from "./UserData";
import OrderData from "./OrderData";
import IData from "./IData";

export default class DataFactory {
    static createData(type: "user" | "order"): IData {
        // Logic to create and return a new instance of Data
        if (type === "user") {
            return new UserData();
        } else if (type === "order") {
            return new OrderData();
        } else {
            throw new Error("Invalid type!");
        }
    }
}