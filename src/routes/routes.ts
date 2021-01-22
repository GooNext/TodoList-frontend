// Task
import Task from '../components/Task/Task';

// All categories
import AllCategories from '../pages/AllCategories/AllCategories';

type RouteObj = {
  path: string;
  exact: boolean;
  name: string;
  component: any;
};

const routes: Array<RouteObj> = [];

routes.push({ path: '/task/:id', exact: true, name: 'Task', component: Task });
routes.push({ path: '/categories', exact: true, name: 'Categories', component: AllCategories });

export default routes;
