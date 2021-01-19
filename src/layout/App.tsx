import './App.scss';
import { Col, Row, Spin } from 'antd';
import MenuItems from '../components/Menu/MenuItems';
import routes from '../routes/routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Suspense } from 'react';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <Row>
          <Col span={4}>
            <MenuItems />
          </Col>
          <Col span={20}>
            <Switch>
              {routes.map((route) => {
                return <Route component={route.component} key={route.path} path={route.path} exact={route.exact} name={route.name} />
              })}
            </Switch>
          </Col>
        </Row>
      </Suspense>
    </BrowserRouter>
  )
}

export default App;
