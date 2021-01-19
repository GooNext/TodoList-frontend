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
        addCategory(sendObj)
            .then(() => this.getCategories())
            .catch((err: string) => alert(err))
    }
}

export default new CategoriesStore()