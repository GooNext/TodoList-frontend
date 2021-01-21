import { Skeleton, Card, Avatar, Popover } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Meta from 'antd/lib/card/Meta';
import CategoriesStore from '../../stores/CategoriesStore';
import './AllCategories.scss';

interface ItemType {
  title: string;
}

const CategoryItem = ({ title }: ItemType) => {
  const [state, setState] = useState(false);
  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <Popover
          content={<a href="/">Close</a>}
          title="Title"
          trigger="click"
          visible={state}
          onVisibleChange={setState}
        >
          <EllipsisOutlined key="ellipsis" />
        </Popover>,
      ]}
    >
      <Skeleton avatar loading={false} active>
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={title}
          description="This is the description"
        />
      </Skeleton>
    </Card>
  );
};

const AllCategories = () => {
  const { categories } = CategoriesStore;
  return (
    <div className="allCategories">
      {categories.map((item: ItemType) => (
        <CategoryItem title={item.title} />
      ))}
    </div>
  );
};

export default observer(AllCategories);
