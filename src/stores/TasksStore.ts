import { getTasks } from '../api/index';
import { makeAutoObservable } from "mobx"

class TasksStore {
    tasks = []

    constructor() {
        makeAutoObservable(this)
        this.getTasks()
    }

    getTasks = async () => {
        this.tasks = await getTasks()
    }
}

export default new TasksStore()