import { Button, Input, Menu, message, Tooltip } from 'antd';
import './Menu.scss'
import { useState } from 'react';
import CategoriesStore from '../../stores/CategoriesStore';
import TasksStore from '../../stores/TasksStore';
import { observer } from 'mobx-react-lite';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom'
import React, { useCallback } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';

interface SubMenuType {
    title: string,
    _id: string
}

const AddNewCategory = ({ setIsModalVisible, isModalVisible }: any) => {
    const [sendObj, setSendObj] = useState({
        title: '',
        time: new Date(),
        icon: '1242154'
    })

    const handleOk = useCallback(() => {
        setIsModalVisible(false);
        CategoriesStore.addCategory(sendObj)
        message.info('Category has been successfully added');
    }, [sendObj, setIsModalVisible]);

    const handleCancel = () => {
        setIsModalVisible(false)
    };

    const handleInputChange = useCallback((e) => setSendObj({ ...sendObj, title: e.target.value }), [sendObj, setIsModalVisible]);

    return <ModalWindow title={'Add new category'} onChange={handleInputChange} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} />
}

const AddNewTask = ({ setIsModalVisible, isModalVisible, title, categoryId }: any) => {
    const [sendObj, setSendObj] = useState({
        title: '',
        time: new Date(),
        icon: '1242154',
        categoryId: ''
    })

    const handleOk = useCallback(() => {
        setIsModalVisible(false);
        TasksStore.addNewTask(sendObj)
        message.info('Task has been successfully added');
    }, [sendObj, setIsModalVisible]);

    const handleCancel = () => {
        setIsModalVisible(false)
    };

    const handleInputChange = useCallback((e) => setSendObj({ ...sendObj, title: e.target.value, categoryId }), [sendObj, setIsModalVisible]);

    return <ModalWindow title={title} onChange={handleInputChange} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} />
}

const RenderMenuItems = observer(({ showModal }: any) => {
    const [state] = useState({ collapsed: false })
    const [taskState, setTaskState] = useState(false)
    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={state.collapsed}
        >
            {CategoriesStore.categories.map((item: SubMenuType, index: number) => {
                return (
                    <SubMenu key={`sub4-${index}`} icon={<SettingOutlined />} title={item.title}>
                        <Menu.ItemGroup className="df align-items-center" key={`${item}${index}`} title={item.title}>
                            <div>
                                <Button onClick={() => setTaskState(!taskState)} size="small" type="primary">
                                    <Tooltip placement="top" title={`Add task for ${item.title} category`}>
                                        <PlusOutlined />
                                    </Tooltip>
                                </Button>
                                <AddNewTask title={`Add task for ${item.title} category`} categoryId={item._id} setIsModalVisible={setTaskState} isModalVisible={taskState} />
                            </div>
                        </Menu.ItemGroup>
                        {TasksStore.tasks.map((value: any) => value.categoryId === item._id ? <Menu.Item key={value._id}><Link to={`/task/${value._id}`}>{value.title}</Link></Menu.Item> : null)}
                    </SubMenu>
                )
            })}
            <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tooltip placement="top" title="Add new category">
                    <Button onClick={showModal}>
                        <PlusOutlined />
                    </Button>
                </Tooltip>
            </div>
        </Menu>
    )
})

const MenuItems = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sendObj, setSendObj] = useState({
        title: '',
        time: new Date(),
        icon: '1242154'
    })

    const handle = {
        setSendObj: (e: any) => setSendObj(e),
        setIsModalVisible: (e: boolean) => setIsModalVisible(e)
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <>
            <RenderMenuItems showModal={showModal} />
            <AddNewCategory setIsModalVisible={handle.setIsModalVisible} isModalVisible={isModalVisible} sendObj={sendObj} setSendObj={handle.setSendObj} showModal={showModal} />
        </>
    );
}

export default MenuItems