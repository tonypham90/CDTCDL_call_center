import { IExistingUser } from "models";
import { BaseOperation } from "./operator";
import Data from '../data/data';
import data from "../data/data";

class User implements BaseOperation<IExistingUser>{
    private User!: IExistingUser;
    private Data = Data;
    constructor() {
        this.User = {
            id: "",
            fullName: "",
            phone: "",
            avatar: "",
            isDriver: false,
            isActive: false,
            isAdmin: false,
            isVip: false,
            car: {
                brand: "",
                seatNumber: 0,
            },
            coordinate: {
                latitude: 0,
                longitude: 0,
                address: "",
            },
            authentication: {
                password: "",
                salt: "",
            },
            deviceToken: "",
        }
    }
    async get(Id: string): Promise<IExistingUser> {
        const data = await this.Data.getUser(Id);
        this.User = data;
        return data;
    }
    create(): Promise<IExistingUser> {
        throw new Error("Method not implemented.");
    }
    update(): Promise<IExistingUser> {
        throw new Error("Method not implemented.");
    }
    delete(): Promise<IExistingUser> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<IExistingUser> {
        throw new Error("Method not implemented.");
    }
    deleteAll(): Promise<IExistingUser> {
        throw new Error("Method not implemented.");
    }

}