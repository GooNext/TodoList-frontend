export const getCategories = async (): Promise<unknown | string> => {
  const url = 'https://dry-cliffs-80424.herokuapp.com/categories';
  const response = await fetch(url);
  return response.json();
};

export const addCategory = async (sendObj: Record<string, unknown>): Promise<unknown | string> => {
  const url = 'https://dry-cliffs-80424.herokuapp.com/categories/add';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(sendObj),
  });
  return response.json();
};

export const deleteCategory = async (id: string): Promise<unknown | string> => {
  const url = `https://dry-cliffs-80424.herokuapp.com/categories/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  return response.json();
};

export const addNewTask = async (sendObj: Record<string, unknown>): Promise<unknown | string> => {
  const url = `https://dry-cliffs-80424.herokuapp.com/tasks/add`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(sendObj),
  });
  return response.json();
};

export const getTasks = async (): Promise<unknown | any> => {
  const url = `https://dry-cliffs-80424.herokuapp.com/tasks/`;
  const response = await fetch(url);
  return response.json();
};

export const getTaskById = async (id: string): Promise<unknown | string> => {
  const url = `https://dry-cliffs-80424.herokuapp.com/tasks/${id}`;
  const response = await fetch(url);
  return response.json();
};

export const deleteTask = async (id: string): Promise<unknown | string> => {
  const url = `https://dry-cliffs-80424.herokuapp.com/tasks/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  return response.json();
};

export const getBoards = async (): Promise<unknown | any> => {
  const url = `https://dry-cliffs-80424.herokuapp.com/boards/`;
  const response = await fetch(url);
  return response.json();
};

export const addBoard = async (sendObj: Record<string, unknown>): Promise<unknown | string> => {
  const url = `https://dry-cliffs-80424.herokuapp.com/boards/add`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(sendObj),
  });
  return response.json();
};
