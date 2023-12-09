import axios from 'axiosConfig'
import { IExistingUser } from '../models/user';
import { IExistingOrder } from 'models/interface';

export const getUser = async (id: string) => {
  const { data } = await axios.get(`/users/${id}`)
  return data as IExistingUser
}

export default class ServiceUser {
  user: IExistingUser | null = null;

  constructor(id: string) {
    this.initialize(id);
  }

  async initialize(id: string) {
    this.user = await getUser(id);
  }

  get id() {
    return this.user?.id;
  }

  async getHistory() { // gethistory() is a method of ServiceUser
    const { data } = await axios.post(`/users/orders`, { passengerId: this.id });
    return data as IExistingOrder[];
  }

  update() {
    return axios.put(`/users/${this.id}`, this.user); // this.user is an object of IExistingUser
  }
  name() {
    return this.user?.fullName;
  }
  phone() {
    return this.user?.phone;
  }
}