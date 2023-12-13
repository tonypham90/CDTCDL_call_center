import { use } from 'react';
import { IExistingUser } from '../models/user';
import { IExistingOrder } from '../models/interface';
import axios from 'axiosConfig';
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

  public async getUsers(): Promise<IExistingUser[]> {
    const res = await this.axios.get('/users');
    return res.data;
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
}

export default Data.getInstance();