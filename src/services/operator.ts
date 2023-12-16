import ServiceOrder from "./ServiceOrder";

export interface BaseOperation<T> {
    read(Id: string): void;

    create(): void;

    update(): void;

    delete(): void;

    getHistory(): ServiceOrder[];
}