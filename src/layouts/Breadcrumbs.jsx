import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const breadcrumbNameMap = {
  '/dashboard': 'Dashboard',
  '/admin-management': 'Dashboard > Admin Management',
  '/counselor-management': 'Dashboard > Counselor Management',
  '/manage-category': 'Dashboard > Assessment Management > Manage Category',
  '/manage-question': 'Dashboard > Assessment Management > Manage Question',
  

};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  
  const breadcrumbItems = pathSnippets.map((_, index, arr) => {
    const url = `/${arr.slice(0, index + 1).join('/')}`;
    return {
      path: url,
      breadcrumbName: breadcrumbNameMap[url] || 'Unknown'
    };
  });

  return (
    <Breadcrumb style={{ margin: '25px' }}>
      {breadcrumbItems.map(({ path, breadcrumbName }, index) => (
        <Breadcrumb.Item key={path}>
          {index === breadcrumbItems.length - 1 ? (
            breadcrumbName
          ) : (
            <Link to={path}>{breadcrumbName}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
