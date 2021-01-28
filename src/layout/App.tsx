import './App.scss';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import Layout, { Content, Footer } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import routes from '../routes/routes';
import MenuItems from '../components/Menu/MenuItems';
import MainHeader from './Header/Header';

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <MenuItems />
      </Sider>
      <Layout className="site-layout">
        <MainHeader t={t} changeLanguage={changeLanguage} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              {routes.map((route) => {
                return (
                  <Route
                    component={route.component}
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                  />
                );
              })}
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            Created by <a href="https://github.com/GooNext">GooNext</a> &{' '}
            <a href="https://github.com/sergeytestweb">sergeytestweb</a> ©2021
          </div>
          <div style={{ opacity: '0.3' }}>
            <a href="https://rs.school/">
              <img src="https://app.rs.school/static/images/logo-rsschool3.png" alt="xuinya" width="60px" />
            </a>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
