import { Button, Menu, message, Spin, Tooltip } from 'antd';
import './Menu.scss';
import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';
import TasksStore from '../../stores/TasksStore';
import CategoriesStore from '../../stores/CategoriesStore';
import { AddNewCategory } from '../Modals/Modals';

interface SubMenuType {
  title: string;
  _id: string;
}

const RenderMenuItems = observer(({ showModal }: any) => {
  const [state] = useState({ collapsed: false });
  // const [taskState, setTaskState] = useState(false);
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      inlineCollapsed={state.collapsed}
    >
      {CategoriesStore.categories.length ? (
        CategoriesStore.categories.map((item: SubMenuType) => {
          return (
            <SubMenu key={`sub4-${item._id}`} icon={<SettingOutlined />} title={item.title}>
              {TasksStore.tasks.map((value: any) =>
                value.categoryId === item._id ? (
                  <Menu.Item key={value._id}>
                    <Link to={`/task/${value._id}`}>{value.title}</Link>
                  </Menu.Item>
                ) : null
              )}
            </SubMenu>
          );
        })
      ) : (
        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin />
        </div>
      )}
      <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Tooltip placement="top" title="Add new category">
          <Button onClick={showModal}>
            <PlusOutlined />
          </Button>
        </Tooltip>
      </div>
    </Menu>
  );
});

const MenuItems = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    icon: '1242154',
  });

  const handle = {
    setSendObj: (e: any) => setSendObj(e),
    setIsModalVisible: (e: boolean) => setIsModalVisible(e),
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <RenderMenuItems showModal={showModal} />
      <AddNewCategory
        setIsModalVisible={handle.setIsModalVisible}
        isModalVisible={isModalVisible}
        sendObj={sendObj}
        setSendObj={handle.setSendObj}
        showModal={showModal}
      />
    </>
  );
};

export default MenuItems;
