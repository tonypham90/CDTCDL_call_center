import { ConnectionStatuses, OrderStatuses } from "services/emuns";

export interface BaseModel { }

export interface ILog {
    occurredAt: Date;
    status: string;
    userId: string;
}

export interface IExistingLog extends ILog {
    id: string;
}


export interface ILocation {
    latitude: number;
    longitude: number;
    address?: string;
}

export interface IExistingLocation extends ILocation {
    id: string;
}

export interface IAddress {
    number: number;
    street: string;
    ward: string;
    district: string;
    province: string;
}

export interface IExistingAddress extends IAddress {
    id: string;
}

export interface IAuthentication {
    password: string;
}

export interface IExistingAuthentication extends IAuthentication {
    id: string;
}

export interface ICar {
    seatNumber?: number;
    brand?: string;
}

export interface IExistingCar extends ICar {
    id: string;
}

export interface IConnection {
    connectedAt: Date;
    driverId: string;
    status: ConnectionStatuses;
}

export interface IExistingConnection extends IConnection {
    id: string;
}

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

export interface IOrder extends BaseModel {
    passengerId: string;
    driverId?: string;
    car?: ICar;
    departure: ILocation;
    destination: ILocation;
    status: OrderStatuses;
    isVip: boolean;
    scheduledTime?: Date;
    connections?: [IConnection];
    logs?: Array<ILog>;
    note?: string;
}

