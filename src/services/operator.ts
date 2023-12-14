
import data from "data/data";
import { promises } from "dns";
import { get } from "http";
export interface BaseOperation<T> {
    get(Id: string): void;
    create(): void;
    update(): void;
    delete(): void;
    getHistory(): void;
}