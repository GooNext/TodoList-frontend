import React from 'react';

type RouteObj = {
    path: string,
    exact: boolean,
    name: string,
    component: any,
}

const routes: Array<RouteObj> = []

//Task
// const Task = import('../components/Task/Task');
import Task from '../components/Task/Task'

routes.push(
    { path: '/task/:id', exact: true, name: 'Task', component: Task },
);

//All categories
import AllCategories from '../pages/AllCategories/AllCategories'
// const AllCategories = import('../pages/AllCategories/AllCategories')
routes.push(
    { path: '/categories', exact: true, name: 'Categories', component: AllCategories },
);

export default routes;
