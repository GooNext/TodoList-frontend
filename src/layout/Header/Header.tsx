import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/categories">All categories</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/tasks">All tasks</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default MainHeader;
