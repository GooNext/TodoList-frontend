/* eslint-disable jsx-a11y/alt-text */
import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';

const MainHeader = (props: any) => {
  const { t, changeLanguage } = props;
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="header__container">
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">{t('All categories')}</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/tasks">{t('All tasks')}</Link>
          </Menu.Item>
        </Menu>
        <div className="header__container--locales">
          <div className="locale locale__en" onClick={() => changeLanguage('en')} />
          <div className="locale locale__ru" onClick={() => changeLanguage('ru')} />
          <div className="locale locale__zh" onClick={() => changeLanguage('zh')} />
        </div>
      </div>
    </Header>
  );
};

export default MainHeader;
