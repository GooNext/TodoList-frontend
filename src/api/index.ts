export const getCategories = async () => {
    const url: string = 'https://dry-cliffs-80424.herokuapp.com/categories'
    const response = await fetch(url);
    return response.json();
}

export const addCategory = async (sendObj: Object) => {
    const url: string = 'https://dry-cliffs-80424.herokuapp.com/categories/add'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(sendObj)
    });
    return response.json();
}

export const getTasks = async () => {
    const url: string = `https://dry-cliffs-80424.herokuapp.com/tasks/`
    const response = await fetch(url);
    return response.json();
}

export const getTaskById = async (id: string) => {
    const url: string = `https://dry-cliffs-80424.herokuapp.com/tasks/${id}`
    const response = await fetch(url);
    return response.json();
}