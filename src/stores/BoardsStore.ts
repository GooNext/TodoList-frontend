import { makeAutoObservable } from 'mobx';
import { addBoard, getBoards } from '../api/index';

class BoardsStore {
  boards: Array<{ title: string }> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getBoards() {
    this.boards = await getBoards();
  }

  addBoard = async (sendObj: any) => {
    addBoard(sendObj)
      .then(() => {
        this.getBoards();
      })
      .catch((err: string) => new Error(err));
  };
}

export default new BoardsStore();
