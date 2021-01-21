import './App.scss';
import { Col, Row, Spin } from 'antd';
import MenuItems from '../components/Menu/MenuItems';
import routes from '../routes/routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Suspense, useState } from 'react';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import MainHeader from './Header/Header';

const App = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <div className="logo" />
          <MenuItems />
        </Sider>
        <Layout className="site-layout">
          <MainHeader />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                {routes.map((route) => {
                  return <Route component={route.component} key={route.path} path={route.path} exact={route.exact} name={route.name} />
                })}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copy of Trello ©2018 Created by GoNext & Stwe</Footer>
        </Layout>
      </Layout>
    </Suspense>
  )
}

export default App;
