import { use } from 'react';
import { IExistingUser, IUser } from '../models/user';
import { IExistingOrder } from '../models/interface';
import axios from 'axiosConfig';
import data from 'data/data';
class Data {
  private static instance: Data;
  private axios = axios;

  private constructor() { }

  public static getInstance(): Data {
    if (!Data.instance) {
      Data.instance = new Data();
    }
    return Data.instance;
  }

  public async getUsers(page: number = 1) {
    try {
      const res = await this.axios.get('/users?_page=' + page);
      return res.data;
    }
    catch (err) {
      console.log(err);
      return [];
    }
  }

  public async getUser(id: string): Promise<IExistingUser> {
    const res = await this.axios.get(`/users/${id}`);
    return res.data;
  }

  public async getOrders(): Promise<IExistingOrder[]> {
    const res = await this.axios.get('/orders');
    return res.data;
  }

  public async getOrdersByPassengerId(id: string): Promise<IExistingOrder[]> {
    const res = await this.axios.get(`/orders`);
    return res.data;
  }

  public async getOrder(id: string) {
    const res = await this.axios.get(`/orders/${id}`);
    return res.data;
  }

  public async createUsers(user: IUser) {
    const res = await this.axios.post('/users', user);
    return res.data;
  }
}

export default Data.getInstance();