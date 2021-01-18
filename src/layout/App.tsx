import './App.scss';
import { Row, Spin } from 'antd';
import MenuItems from '../components/Menu/MenuItems';
import routes from '../routes/routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';

const App = () => {
  return (
    <Row>
      <BrowserRouter>
        <Suspense fallback={<Spin />}>
          <MenuItems />
          <Switch>
            {routes.map((route) => {
              return <Route component={route.component} key={route.path} path={route.path} exact={route.exact} name={route.name} />
            })}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Row>
  )
}

export default App;
