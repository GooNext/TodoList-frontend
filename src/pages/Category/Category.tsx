import { Breadcrumb, Button, PageHeader, Popover, Progress } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Board from 'react-trello';
import { CheckOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import BoardsStore from '../../stores/BoardsStore';
import CategoriesStore from '../../stores/CategoriesStore';
import TasksStore from '../../stores/TasksStore';
import { AddNewBoard, AddNewTask, OnTaskEdit } from '../../components/Modals/Modals';
import BoardsData from './BoardsData';

import './Category.scss';

const Category = ({ match }: any) => {
  const [newBoard, setNewBoard] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const filteredCategory = CategoriesStore.categories.filter((e: any) => e._id === match.params.id)[0];
  const categoryInfo = {
    id: match.params.id,
    title: filteredCategory?.title,
  };

  useEffect(() => {
    BoardsStore.getBoards();
  }, []);

  const handle = {
    addNewBoard: (e: boolean) => setNewBoard(e),
    addNewTask: (e: boolean) => setNewTask(e),
    updateTask: (e: boolean) => setUpdateTask(e),
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDragEnd = (cardId, sourceLaneId, targetLaneId, position) => {
    const taskId = cardId;
    const boardId = targetLaneId;
    if (sourceLaneId !== targetLaneId) TasksStore.updateTaskByBoardId(taskId, boardId);
  };

  const onTaskDelete = (cardId) => {
    TasksStore.deleteTask(cardId);
  };

  const onBoardDelete = (id) => {
    BoardsStore.deleteBoard(id);
  };

  const onStatusUpdate = (id, isCompleted) => {
    TasksStore.updateStatus(id, { isCompleted: !isCompleted });
  };

  const CustomBoardHeader = (e) => {
    const { title, label } = e;
    return (
      <div className="card df justify-between">
        <h4 className="card__title">
          {title} {label}
        </h4>
        <div>
          <Popover
            content={
              <span onClick={() => onBoardDelete(e.id)} style={{ cursor: 'pointer' }}>
                <DeleteOutlined style={{ color: 'red' }} /> Delete board
              </span>
            }
          >
            <MoreOutlined />
          </Popover>
        </div>
      </div>
    );
  };

  const CustomTask = (e) => {
    const { title, description, id, isCompleted } = e;
    const taskInfo = {
      title,
      description,
      id,
    };

    return (
      <div className="task">
        <OnTaskEdit taskInfo={taskInfo} setIsModalVisible={handle.updateTask} isModalVisible={updateTask} />
        <div className="task__title df justify-between align-items-center">
          <h3 className="task__title">{title}</h3>
          <Popover
            content={
              <div>
                <div className="task__menu--item" onClick={() => setUpdateTask(true)} style={{ cursor: 'pointer' }}>
                  <EditOutlined style={{ color: 'blue' }} /> Edit task
                </div>
                <div
                  className="task__menu--item"
                  onClick={() => onStatusUpdate(id, isCompleted)}
                  style={{ cursor: 'pointer' }}
                >
                  <CheckOutlined style={{ color: 'green' }} /> Change status
                </div>
                <div className="task__menu--item" onClick={() => onTaskDelete(id)} style={{ cursor: 'pointer' }}>
                  <DeleteOutlined style={{ color: 'red' }} /> Delete task
                </div>
              </div>
            }
          >
            <MoreOutlined style={{ color: '#333' }} />
          </Popover>
        </div>
        <hr />
        <div className="task__body">
          <small>{description}</small>
        </div>
        <Progress status={!isCompleted ? 'exception' : 'success'} percent={100} size="small" />
      </div>
    );
  };

  return (
    <>
      <div className="category__header">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">All categories</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{categoryInfo.title}</Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader className="category__header df justify-between" title={`All boards for ${categoryInfo.title}`}>
          <div className="df">
            <div style={{ margin: '0 3px' }} className="category__header--board">
              <Button onClick={() => setNewBoard(true)}>Add new board</Button>
              <AddNewBoard
                categoryId={match.params.id}
                isModalVisible={newBoard}
                setIsModalVisible={handle.addNewBoard}
              />
            </div>
            <div style={{ margin: '0 3px' }} className="category__header--task">
              <Button onClick={() => setNewTask(true)}>Add new task</Button>
              <AddNewTask categoryId={match.params.id} isModalVisible={newTask} setIsModalVisible={handle.addNewTask} />
            </div>
          </div>
        </PageHeader>
      </div>
      <div className="category__body">
        <Board
          laneStyle={{ backgroundColor: 'none' }}
          style={{ color: '#fff' }}
          handleDragEnd={onDragEnd}
          collapsibleLanes
          components={{ LaneHeader: CustomBoardHeader, Card: CustomTask }}
          data={BoardsData(match.params.id)}
        />
      </div>
    </>
  );
};

export default withRouter(observer(Category));
