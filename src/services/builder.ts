import {IExistingUser, IUser} from "../models";
import DataFactory from "../data/api";
import {set} from "react-hook-form";
import {ISignUp, ICar} from "../models/interface";


export class UserBuilder {
    private static instance: UserBuilder;
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

    setId(id: string): UserBuilder {
        this.user.id = id;
        return this;
    }

    setFullName(fullName: string): UserBuilder {
        this.user.fullName = fullName;
        return this;
    }

    setPhone(phone: string): UserBuilder {
        this.user.phone = phone;
        return this;
    }

    setAvatar(avatar: string): UserBuilder {
        this.user.avatar = avatar;
        return this;
    }

    setIsDriver(isDriver: boolean): UserBuilder {
        this.user.isDriver = isDriver;
        return this;
    }

    setIsActive(isActive: boolean): UserBuilder {
        this.user.isActive = isActive;
        return this;
    }

    setIsAdmin(isAdmin: boolean): UserBuilder {
        this.user.isAdmin = isAdmin;
        return this;
    }

    setIsVip(isVip: boolean): UserBuilder {
        this.user.isVip = isVip;
        return this;
    }

    setCar(car: ICar | undefined): UserBuilder {
        this.user.car = car;
        return this;
    }

    setCoordinate(coordinate: { latitude: number, longitude: number, address: string }): UserBuilder {
        this.user.coordinate = coordinate;
        return this;
    }

    setPassword(password: string): UserBuilder {
        this.user.authentication.password = password;
        return this;
    }

    setDeviceToken(deviceToken: string): UserBuilder {
        this.user.deviceToken = deviceToken;
        return this;
    }


    // Add other setters for each property...

    build(): IExistingUser {
        if (this.user.id === "") {
            if (this.user.phone === "") {
                throw new Error("Phone is required");
            } else {
                this.data.find("phone", this.user.phone).then((res) => {
                    if (res.length > 0) {
                        this.user = res[0];
                    } else if (this.user.fullName === "") {
                        throw new Error("Full name is required");
                    } else {
                        const newUser: ISignUp = {
                            isActived: false, isAdmin: false,
                            avatar: this.user.avatar,
                            fullName: this.user.fullName,
                            isDriver: this.user.isDriver,
                            password: this.user.authentication.password,
                            phone: this.user.phone
                        };
                        this.data.create(newUser).then((res) => {
                            this.user = res;
                        })
                    }
                })
            }
        } else {
            this.data.get(this.user.id).then((res) => {
                if (res) {
                    this.user = res;
                } else {
                    throw new Error("User not found");
                }
            })
        }
        return this.user;
    }
}