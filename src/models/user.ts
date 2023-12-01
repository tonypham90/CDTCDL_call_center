import { BaseModel } from '.';
export interface IUser extends BaseModel {
    phone: string;
    avatar: string;
    fullName: string;
    isDriver: boolean;
    isActive: boolean;
    isAdmin: boolean;
    isVip: boolean;
    car?: ICar;
    coordinate: ILocation;
    address?: IAddress;
    authentication: IAuthentication;
    deviceToken: string;
}

export interface IExistingUser extends IUser {
    id: string;
}