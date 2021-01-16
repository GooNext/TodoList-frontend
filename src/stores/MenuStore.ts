import { getCategories } from './../api/index';
import { makeAutoObservable } from "mobx"

class MenuStore {
    categories = []

    constructor() {
        makeAutoObservable(this)
        this.getCategories()
    }

    getCategories = async () => {
        this.categories = await getCategories()
    }
}

export default new MenuStore()