import { Breadcrumb, Button, Card, message, PageHeader } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusOutlined } from '@ant-design/icons';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import BoardsStore from '../../stores/BoardsStore';
import CategoriesStore from '../../stores/CategoriesStore';
import './Category.scss';
import TasksStore from '../../stores/TasksStore';

const AddNewBoard = ({ setIsModalVisible, isModalVisible, categoryId }: any) => {
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    icon: '1242154',
    categoryId,
  });

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
    BoardsStore.addBoard(sendObj);
    message.info('Board has been successfully added');
  }, [sendObj, setIsModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = useCallback((e) => setSendObj({ ...sendObj, title: e.target.value }), [sendObj]);

  return (
    <ModalWindow
      title="Add new board"
      onChange={handleInputChange}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    />
  );
};

const AddNewTask = ({ setIsModalVisible, isModalVisible, categoryId, boardId }: any) => {
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    icon: '1242154',
    categoryId,
    boardId,
  });

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
    TasksStore.addNewTask(sendObj);
    message.info('Task has been successfully added');
  }, [sendObj, setIsModalVisible]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = useCallback((e) => setSendObj({ ...sendObj, title: e.target.value, boardId }), [
    sendObj,
    boardId,
  ]);

  return (
    <ModalWindow
      title="Add new task"
      onChange={handleInputChange}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    />
  );
};

const RenderBoards = observer(({ item, index, match }: any) => {
  const [newTask, setNewTask] = useState(false);
  const [boardId, setBoardId] = useState('');

  const addNewBoardHandler = (id: string) => {
    setBoardId(id);
    setNewTask(true);
  };

  const handle = {
    addNewTask: (e: boolean) => setNewTask(e),
  };

  return (
    <div key={item._id} className="category__body--item">
      <Card
        type="inner"
        extra={
          <Button onClick={() => addNewBoardHandler(item._id)}>
            <PlusOutlined />
          </Button>
        }
        title={item.title}
      >
        <AddNewTask
          boardId={boardId}
          // eslint-disable-next-line react/prop-types
          categoryId={match.params.id}
          isModalVisible={newTask}
          setIsModalVisible={handle.addNewTask}
        />
        <Droppable droppableId={`droppable${index}`}>
          {(provided: any) => (
            <div ref={provided.innerRef}>
              {TasksStore.tasks.map((task: any, i) => (
                <>
                  {task.boardId === item._id ? (
                    <Draggable key={task._id} draggableId={task._id} index={i}>
                      {(provided2) => (
                        <div
                          className="m4"
                          ref={provided2.innerRef}
                          {...provided2.draggableProps}
                          {...provided2.dragHandleProps}
                        >
                          <Card headStyle={{ background: '#CDF1FF' }} type="inner" title={task.title}>
                            taskinfi taskinfi taskinfi taskinfi taskinfi
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ) : null}
                </>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </div>
  );
});

const Category = ({ match }: any) => {
  const [newBoard, setNewBoard] = useState(false);
  const filteredCategory = CategoriesStore.categories.filter((e: any) => e._id === match.params.id)[0];
  const categoryInfo = {
    id: match.params.id,
    title: filteredCategory?.title,
  };

  const handle = {
    addNewBoard: (e: boolean) => setNewBoard(e),
  };

  useEffect(() => {
    BoardsStore.getBoards();
  }, []);

  const onDragEnd = () => {
    console.log('ended');
  };

  const BoardItem = observer(() => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        {BoardsStore.boards.map((item: any, index) => {
          return <RenderBoards match={match} item={item} index={index} />;
        })}
      </DragDropContext>
    );
  });

  return (
    <>
      <div className="category__header">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/categories">All categories</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{categoryInfo.title}</Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader className="category__header df justify-between" title={`All boards for ${categoryInfo.title}`}>
          <Button onClick={() => setNewBoard(true)}>Add new board</Button>
          <AddNewBoard categoryId={match.params.id} isModalVisible={newBoard} setIsModalVisible={handle.addNewBoard} />
        </PageHeader>
      </div>
      <div className="category__body">
        <BoardItem />
      </div>
    </>
  );
};

export default withRouter(observer(Category));
