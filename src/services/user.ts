import {IExistingUser} from "models";
import {BaseOperation} from "./operator";
import DataFactory from '../data/api';
import ServiceOrder from "./ServiceOrder";

import JsonService from "./JsonService/userJsonService";
import {JsonServiceFactory} from "./JsonService";
import {UserBuilder} from "./builder";
import {IBaseShow} from "../models/show";

export class User implements BaseOperation<IExistingUser> {
    private static instance: User;
    public userBuilder = new UserBuilder();
    private JsonService = JsonServiceFactory.createData("user");
    private user: IExistingUser;
    private data = DataFactory.createData("user")

    constructor() {
        this.user = {
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

    getHistory(): ServiceOrder[] {
        throw new Error("Method not implemented.");
    }


    async read(Id: string): Promise<void> {
        this.user = this.userBuilder.setId(Id).build();
    }

    async setByPhone(phone: string, name: string): Promise<void> {

        this.user = this.userBuilder.setPhone(phone).setFullName(name).build();
    }

    create(): Promise<void> {
        this.user = this.userBuilder.setAvatar(this.user.avatar).setCar(this.user.car).setDeviceToken(this.user.deviceToken).setIsActive(this.user.isActive).setIsAdmin(this.user.isAdmin).setIsDriver(this.user.isDriver).setIsVip(this.user.isVip).setPassword(this.user.authentication.password).build();
        return this.data.create(this.user);
    }

    update(): Promise<IExistingUser> {
        throw new Error("Method not implemented.");
    }

    delete(): Promise<IExistingUser> {
        throw new Error("Method not implemented.");
    }


}