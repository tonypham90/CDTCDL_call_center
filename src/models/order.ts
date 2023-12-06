import { BaseModel } from '.';
import { ILocation, IAddress, IAuthentication, ICar } from './interface';
import { ILog } from './interface';
export interface IOrder extends BaseModel {
    passengerId: string;
    driverId?: string;
    car?: ICar;
    departure: ILocation;
    destination: ILocation;
    status: string;
    isVip: boolean;
    scheduledTime?: Date;
    connections?: [string];
    logs?: Array<ILog>;
    note?: string;
}