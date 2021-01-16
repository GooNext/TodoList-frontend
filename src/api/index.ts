export const getCategories = async () => {
    const url: string = 'https://dry-cliffs-80424.herokuapp.com/categories'
    const response = await fetch(url);
    return response.json();
}