import { BaseModel } from '.';
export interface IOrder extends BaseModel {
    passengerId: TObjectId;
    driverId?: TObjectId;
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