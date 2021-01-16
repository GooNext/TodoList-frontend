import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import './Menu.scss'
import { useEffect, useState } from 'react';
import MenuStore from '../../stores/MenuStore';
import { observer } from 'mobx-react-lite';

const MenuItems = observer(() => {
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    const onOpenChange = (keys: Array<object | string | any>) => {
        const latestOpenKey: any = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) setOpenKeys(keys);
        else setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    return (
        <div style={{ width: 256 }}>
            <Menu mode="inline" openKeys={openKeys} onOpenChange={(keys) => onOpenChange(keys)} style={{ width: 256 }}>
                {MenuStore.categories.map((item: string | any, index) => (
                    <SubMenu key={`sub4-${index}`} icon={<SettingOutlined />} title={item.title}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                ))}
            </Menu>
        </div >
    );
})

export default MenuItems