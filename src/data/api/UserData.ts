import IData from "./IData";
import { IExistingUser, IUser } from "../../models";
import axios from "axiosConfig";
import { JsonServiceFactory } from "../../services/JsonService";
import toast from "react-hot-toast";
import { IExistingOrder, ISignUp } from "../../models/interface";
import { IBaseShow, IExistingUserShow } from "../../models/show";
import userJsonService from '../../services/JsonService/userJsonService';

export default class UserData implements IData {
    private static instance: UserData;
    private axios = axios;
    private toast = toast;
    private JsonService = JsonServiceFactory.createData("user")

    constructor() {
    }

    async find(options: any, value: any): Promise<IExistingUser[] | IExistingOrder[]> {
        try {
            const [res] = await Promise.all([this.axios.get(`/phone/users?${options}=${value}`)]);
            toast("Found");
            return this.JsonService.ParseListJson(res.data);
        } catch (err) {
            console.log(err);
            toast("Not Found")
            return [];
        }

    }

    async getAll(page?: number): Promise<IExistingUserShow> {
        try {
            if (!page) page = 1;
            const res = await this.axios.get('/mobile/users');
            if (res.status === 200) {
                toast("Found");
                const result: IExistingUserShow = { data: [], metadata: {} };
                result.data = this.JsonService.ParseListJson(res.data.data);
                result.metadata = res.data.metadata;
                return result
            } else {
                toast("Not Found");
                return { data: [], metadata: {} };
            }
        } catch (err) {
            console.log(err);
            toast("Not Found")
            return { data: [], metadata: {} };
        }
    }

    async get(id: string): Promise<IExistingUser> {
        return this.JsonService.ParseJson(await this.axios.get(`/mobile/users/${id}`));

    }

    update(id: string, data: any): Promise<void> {
        return axios.put(`/users/${id}`, data);
    }

    delete(id: string): Promise<any> {
        return axios.delete(`/users/${id}`);
    }

    create(data: ISignUp): Promise<IExistingUser> {
        const newuser = this.JsonService.ParseJson(axios.post('/mobile/users', data));
        return this.JsonService.ParseJson(newuser);
    }

    async getAvatar(Id: string): Promise<File> {
        const res = await axios.get(`/user/avatar/${Id}`, { responseType: 'blob' })
        return res.data;
    }
}