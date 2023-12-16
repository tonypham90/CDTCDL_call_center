export default interface IData {
    getAll(page?: number): Promise<any>;

    get(id: string): Promise<any>;

    update(id: string, data: any): Promise<any>;

    delete(id: string): Promise<any>;

    create(data: any): Promise<any>;

    find(options: any, value: any): Promise<any>;

}