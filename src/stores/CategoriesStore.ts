import { makeAutoObservable } from 'mobx';
import { getCategories, addCategory } from '../api/index';

class CategoriesStore {
  categories: any = [];

  constructor() {
    makeAutoObservable(this);
    this.getCategories();
  }

  getCategories = async () => {
    this.categories = await getCategories();
  };

  addCategory = async (sendObj: any) => {
    addCategory(sendObj)
      .then(() => {
        this.getCategories();
      })
      .catch((err: string) => new Error(err));
  };
}

export default new CategoriesStore();
