import IData from "./IData";
import axios from "../../axiosConfig";
import {IExistingOrder} from "../../models/interface";
import {JsonServiceFactory} from "../../services/JsonService";
import toast from "react-hot-toast";
import {IExistingUser} from "../../models";
import {IBaseShow} from "../../models/show";

export default class OrderData implements IData {
    private axios = axios;
    private JsonService = JsonServiceFactory.createData("order");

    constructor() {
    }

    async getAll(page?: number): Promise<IBaseShow> {
        try {
            if (!page) page = 1;
            const res = await this.axios.get('/order?_page=' + page);
            if (res.status === 200) {
                toast("Found");
                const result: IBaseShow = {data: [], metadata: {}};
                result.data = this.JsonService.ParseListJson(res.data.data);
                result.metadata = res.data.metadata;
                return result
            } else {
                toast("Not Found");
                return {data: [], metadata: {}};
            }


        } catch (err) {
            console.log(err);
            toast("Not Found")
            return {data: [], metadata: {}};
        }
    }

    get(id: string): Promise<IExistingOrder> {
        throw new Error("Method not implemented.");
    }

    update(id: string, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    create(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async find(options: any, value: any): Promise<IExistingUser[] | IExistingOrder[]> {
        try {
            const [res] = await Promise.all([this.axios.get(`/order?${options}=${value}`)]);
            toast("Found");
            return this.JsonService.ParseListJson(res.data);
        } catch (err) {
            console.log(err);
            toast("Not Found")
            return [];
        }

    }

}