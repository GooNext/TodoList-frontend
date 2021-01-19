import { makeAutoObservable } from 'mobx';
import { getTaskById, deleteTask } from '../api';
class TaskStore {
    task: any = {}

    constructor() {
        makeAutoObservable(this)
    }

    getTask = async (id: string) => {
        this.task = await getTaskById(id)
    }
}

export default new TaskStore()