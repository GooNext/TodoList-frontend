import { Breadcrumb, PageHeader } from 'antd';
import { observer } from 'mobx-react-lite';
import { Link, withRouter } from 'react-router-dom';
import CategoriesStore from '../../stores/CategoriesStore';
import './Category.scss';

const Category = ({ match }: any) => {
  const filteredCategory = CategoriesStore.categories.filter((e: any) => e._id === match.params.id)[0];
  const categoryInfo = {
    id: match.params.id,
    title: filteredCategory?.title,
  };
  return (
    <>
      <div className="category__header">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/categories">All categories</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{categoryInfo.title}</Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader className="category__header" title={categoryInfo.title} subTitle="This is a subtitle" />
      </div>
      <div className="category__body">
        <h1>Body</h1>
      </div>
    </>
  );
};

export default withRouter(observer(Category));
