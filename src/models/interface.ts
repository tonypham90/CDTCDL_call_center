import { ConnectionStatuses, OrderStatuses } from "models/emuns";

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
    salt: string;
    sessionToken?: string;
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

export interface IExistingOrder extends IOrder {
    id: string;
}

export interface ILog {
    occurredAt: Date;
    status: string;
    userId: string;
}

