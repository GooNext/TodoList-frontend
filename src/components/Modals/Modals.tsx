import { Input, message, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import { useCallback, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import BoardsStore from '../../stores/BoardsStore';
import CategoriesStore from '../../stores/CategoriesStore';
import TasksStore from '../../stores/TasksStore';

export const AddNewBoard = ({ setIsModalVisible, isModalVisible, categoryId }: any) => {
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    icon: '1242154',
    categoryId,
  });

  const handleOk = useCallback(() => {
    if (sendObj.title) {
      BoardsStore.addBoard(sendObj);
      message.info('Board has been successfully added');
      setIsModalVisible(false);
    } else message.error('Please enter a title');
  }, [sendObj, setIsModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = useCallback((e) => setSendObj({ ...sendObj, title: e.target.value }), [sendObj]);

  return (
    <Modal title="Add new board" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Input onChange={handleInputChange} placeholder="Enter title" />
    </Modal>
  );
};

export const AddNewTask = ({ setIsModalVisible, isModalVisible, categoryId }: any) => {
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    description: '',
    icon: '1242154',
    categoryId,
    isCompleted: false,
    boardId: '',
  });

  const handleOk = useCallback(() => {
    if (sendObj.title && sendObj.boardId) {
      TasksStore.addNewTask(sendObj);
      message.info('Task has been successfully added');
      setIsModalVisible(false);
    } else message.error('Add title and board name');
  }, [sendObj, setIsModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handle = {
    inputChange: (e) => setSendObj({ ...sendObj, title: e.target.value }),
    selectChange: (e) => setSendObj({ ...sendObj, boardId: e }),
    textArea: (e) => setSendObj({ ...sendObj, description: e.target.value }),
  };

  return (
    <div>
      <Modal title="Add new task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input onChange={(e) => handle.inputChange(e)} placeholder="Enter title" />
        <Select
          showSearch
          style={{ width: '100%', margin: '15px 0' }}
          placeholder="Select a board"
          optionFilterProp="children"
          onChange={handle.selectChange}
          filterOption={(input: any, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {BoardsStore.boards.map((item: any) => {
            return <>{categoryId === item.categoryId ? <Option value={item._id}>{item.title}</Option> : null}</>;
          })}
        </Select>
        <TextArea placeholder="Enter a description" rows={4} onChange={handle.textArea} />
      </Modal>
    </div>
  );
};

export const AddNewCategory = ({ setIsModalVisible, isModalVisible }: any) => {
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    icon: '1242154',
  });

  const handleOk = useCallback(() => {
    if (sendObj.title) {
      CategoriesStore.addCategory(sendObj);
      message.info('Category has been successfully added');
      setIsModalVisible(false);
    } else message.error('Please enter a title');
  }, [sendObj, setIsModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handle = {
    inputChange: (e) => setSendObj({ ...sendObj, title: e.target.value }),
  };

  return (
    <ModalWindow
      title="Add new category"
      onChange={handle}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      options={[]}
    />
  );
};

export const OnTaskEdit = ({ taskInfo, setIsModalVisible, isModalVisible }: any) => {
  const [sendObj, setSendObj] = useState({
    title: taskInfo.title,
    description: taskInfo.description,
  });

  const handleOk = useCallback(() => {
    TasksStore.updateTask(sendObj, taskInfo.id);
    message.info('Task has been successfully updated');
    setIsModalVisible(false);
  }, [sendObj, setIsModalVisible, taskInfo.id]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handle = {
    inputTitleChange: (e) => setSendObj({ ...sendObj, title: e.target.value }),
    inputDescriptionChange: (e) => setSendObj({ ...sendObj, description: e.target.value }),
  };

  return (
    <div>
      <Modal title="Update task info" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input style={{ marginBottom: '15px' }} onChange={(e) => handle.inputTitleChange(e)} placeholder="Edit title" />
        <TextArea placeholder="Edit description" rows={4} onChange={(e) => handle.inputDescriptionChange(e)} />
      </Modal>
    </div>
  );
};
