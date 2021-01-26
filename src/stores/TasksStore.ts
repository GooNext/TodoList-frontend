import { makeAutoObservable } from 'mobx';
import { addNewTask, deleteTask, getTasks, updateTaskByBoardId } from '../api/index';

class TasksStore {
  tasks: Array<{ title: string }> = [];

  constructor() {
    makeAutoObservable(this);
    this.getTasks();
  }

  getTasks = async () => {
    this.tasks = await getTasks();
  };

  addNewTask = async (sendObj: any) => {
    addNewTask(sendObj)
      .then(() => this.getTasks())
      .catch((err: string) => new Error(err));
  };

  deleteTask = async (id: string) => {
    await deleteTask(id)
      .then(() => this.getTasks())
      .catch((err: string) => new Error(err));
  };

  updateTaskByBoardId = async (taskId: string, boardId: string) => {
    await updateTaskByBoardId(taskId, boardId)
      .then(() => this.getTasks())
      .catch((err: string) => new Error(err));
  };
}

export default new TasksStore();
