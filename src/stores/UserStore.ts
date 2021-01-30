import { makeAutoObservable } from 'mobx';
import { getUserByLogin } from '../api';

class UserStore {
  user: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  getUserByLogin = async (login: string) => {
    this.user = await getUserByLogin(login);
  };
}

export default new UserStore();
