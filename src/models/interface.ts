import { ConnectionStatuses, OrderStatuses } from "models/emuns";
import { Metadata } from "next";

export interface BaseModel {
}

export interface ILog {
    occurredAt: Date;
    status: string;
    userId: string;
}

export interface ILocation {
    latitude: number;
    longitude: number;
    address?: string;
}

export interface IAddress {
    number: number;
    street: string;
    ward: string;
    district: string;
    province: string;
}

export interface IAuthentication {
    password: string;
    salt: string;
    sessionToken?: string;
}

export interface ICar {
    seatNumber?: number;
    brand?: string;
}

export interface IConnection {
    connectedAt: Date;
    driverId: string;
    status: ConnectionStatuses;
}

export interface IOrder extends BaseModel {
    passengerId: string;
    driverId?: string;
    car: ICar;
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

export interface IPageInformation {
    id: string;
    metaData: Metadata
    info: {
        path: string;
        navbarName: string;
        component: string;
        redirect: string;
        isProtected: boolean;
        isPublic: boolean;
        isNavbar: boolean
    };
}

export interface ISignUp {
    fullName: string;
    phone: string;
    password: string;
    avatar?: string;
    isDriver: boolean;
    isVip?: boolean;
    isActived: boolean;
    isAdmin: boolean;
}




