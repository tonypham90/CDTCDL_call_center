// Purpose: TypeScript interfaces for Show model

import { Metadata } from "next";
import { IExistingOrder } from "./interface";
import { IExistingUser } from "models";


export interface IBaseShow {
    metadata: Metadata;

}

export interface IExistingOrderShow {
    data: IExistingOrder[];
    metadata: Metadata;
}
export interface IExistingUserShow {
    data: IExistingUser[];
    metadata: Metadata;
}

