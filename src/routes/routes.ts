import React from 'react';

type RouteObj = {
    path: string,
    exact: boolean,
    name: string,
    component: any,
}

const routes: Array<RouteObj> = []

const Task = React.lazy(() => import('../components/Task/Task'));

routes.push(
    { path: '/task/:id', exact: true, name: 'Task', component: Task },
);

export default routes;
