import { getCategories, addCategory } from '../api/index';
import { makeAutoObservable } from "mobx"

class CategoriesStore {
    categories: any = []

    constructor() {
        makeAutoObservable(this)
        this.getCategories()
    }

    getCategories = async () => {
        this.categories = await getCategories()
    }

    addCategory = async (sendObj: any) => {
        this.categories.push(sendObj)
        addCategory(sendObj)
    }
}

export default new CategoriesStore()