import IData from "./IData";
import {IExistingUser, IUser} from "../../models";
import axios from "axiosConfig";
import {JsonServiceFactory} from "../../services/JsonService";
import toast from "react-hot-toast";
import {IExistingOrder, ISignUp} from "../../models/interface";
import {IBaseShow} from "../../models/show";

export default class UserData implements IData {
    private static instance: UserData;
    private axios = axios;
    private toast = toast;
    private JsonService = JsonServiceFactory.createData("user")

    constructor() {
    }

    async find(options: any, value: any): Promise<IExistingUser[] | IExistingOrder[]> {
        try {
            const [res] = await Promise.all([this.axios.get(`/users?${options}=${value}`)]);
            toast("Found");
            return this.JsonService.ParseListJson(res.data);
        } catch (err) {
            console.log(err);
            toast("Not Found")
            return [];
        }

    }

    async getAll(page?: number): Promise<IBaseShow> {
        try {
            if (!page) page = 1;
            const res = await this.axios.get('/users?_page=' + page);
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

    get(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    update(id: string, data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    create(data: ISignUp): Promise<IExistingUser> {
        return axios.post('/users', data)
    }

    async getAvatar(Id: string): Promise<File> {
        const res = await axios.get(`/user/avatar/${Id}`, {responseType: 'blob'})
        return res.data;
    }
}