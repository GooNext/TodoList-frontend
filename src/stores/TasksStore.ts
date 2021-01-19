import { addNewTask, deleteTask, getTasks } from '../api/index';
import { makeAutoObservable } from "mobx"

class TasksStore {
    tasks: Array<Object> = []

    constructor() {
        makeAutoObservable(this)
        this.getTasks()
    }

    getTasks = async () => {
        this.tasks = await getTasks()
    }

    addNewTask = async (sendObj: any) => {
        addNewTask(sendObj)
            .then(() => this.getTasks())
            .catch((err: string) => alert(err))
    }

    deleteTask = async (id: string) => {
        await deleteTask(id)
            .then(() => this.getTasks())
            .catch((err: string) => alert(err))
    }
}

export default new TasksStore()