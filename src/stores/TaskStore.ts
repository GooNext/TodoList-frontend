import { makeAutoObservable } from 'mobx';
import { getTaskById } from '../api';

interface TaskType {
    title: string,
    time: string
    id: string,
    icon: string,
}

class TaskStore {
    task: any = {}

    constructor() {
        makeAutoObservable(this)
    }

    getTask = async (id: any) => {
        this.task = await getTaskById(id)
    }
}

export default new TaskStore()