import { Result, Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';

const UnauthorizedPage = () => {
  return (
    <div className='pageTemplate1' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Result
        icon={<StopOutlined style={{ fontSize: '64px', color: '#ff4d4f' }} />}
        title="You don't have access to the requested page"
        style={{
          backgroundColor: '#ff4d4f',
          color: '#fff',
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center',
          width: '100%',
          maxWidth: '600px',
        }}
        extra={[
          <Button type="primary" key="home" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default UnauthorizedPage;
