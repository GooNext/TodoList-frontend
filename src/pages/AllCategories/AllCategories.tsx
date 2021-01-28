/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Skeleton, Card, Avatar, Popover, Space, message, PageHeader } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Meta from 'antd/lib/card/Meta';
import CategoriesStore from '../../stores/CategoriesStore';
import './AllCategories.scss';

interface ItemType {
  title: string;
  _id: string;
  t: any;
}

const CategoryItem = ({ t, title, _id }: ItemType) => {
  const [state, setState] = useState(false);

  const deleteCategory = () => {
    CategoriesStore.deleteCategory(_id);
    message.info(`${t('Category with id - ')}${_id} ${t('has been successfully deleted')}`);
    setState(false);
  };

  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <Popover
          content={
            <div className="allCategories__popover--item" onClick={() => deleteCategory()}>
              <Space size={8}>
                <DeleteOutlined style={{ color: 'red' }} />
                {t('Delete category')}
              </Space>
            </div>
          }
          title={t('Category submenu')}
          trigger="click"
          visible={state}
          onVisibleChange={setState}
        >
          <EllipsisOutlined key="ellipsis" />
        </Popover>,
      ]}
    >
      <Link to={`/categories/${_id}`}>
        <Skeleton avatar loading={false} active>
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={title}
            description={t('This is the description')}
          />
        </Skeleton>
      </Link>
    </Card>
  );
};

const AllCategories = () => {
  const { categories } = CategoriesStore;
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        className="category__header"
        title={t('All available categories')}
        subTitle={t('Choose your own category')}
      />
      <div className="allCategories">
        <Space className="allCategories" wrap size={20}>
          {categories.map((item: ItemType) => (
            <CategoryItem t={t} _id={item._id} title={item.title} />
          ))}
        </Space>
      </div>
    </>
  );
};

export default observer(AllCategories);
