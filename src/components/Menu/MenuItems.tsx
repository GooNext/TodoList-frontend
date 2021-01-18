import { Button, Input, Menu, Tooltip } from 'antd';
import './Menu.scss'
import { useState } from 'react';
import CategoriesStore from '../../stores/CategoriesStore';
import TasksStore from '../../stores/TasksStore';
import { observer } from 'mobx-react-lite';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom'
import Modal from 'antd/lib/modal/Modal';

const MenuItems = () => {
    interface SubMenu {
        title: string,
        _id: string
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [state] = useState({ collapsed: false })
    const [sendObj, setSendObj] = useState({
        title: '',
        time: new Date(),
        icon: '1242154'
    })

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        CategoriesStore.addCategory(sendObj)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <div style={{ height: '100vh', width: 256 }}>
            <Menu
                theme="dark"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                style={{ width: 256 }}
                inlineCollapsed={state.collapsed}
            >
                {CategoriesStore.categories.map((item: SubMenu, index: number) => {
                    return (
                        <SubMenu key={`sub4-${index}`} icon={<SettingOutlined />} title={item.title}>
                            <Menu.ItemGroup key="g1" title={item.title}>
                                {TasksStore.tasks.map((value: any) => value.categoryId === item._id ? <Menu.Item key={index}><Link to={`/task/${value._id}`}>{value.title}</Link></Menu.Item> : null)}
                            </Menu.ItemGroup>
                        </SubMenu>
                    )
                })}
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Tooltip placement="top" title="Add new category">
                        <Button onClick={showModal}>
                            <PlusOutlined />
                        </Button>
                    </Tooltip>
                    <Modal title="Add new category" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input onChange={(e) => setSendObj({ ...sendObj, title: e.target.value })} placeholder="Enter title" />
                    </Modal>
                </div>
            </Menu>
        </div >
    );
}

export default observer(MenuItems)