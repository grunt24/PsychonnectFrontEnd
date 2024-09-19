import { useState } from 'react';
import { Modal, Button } from 'antd';

const ComingSoonModal = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Show Coming Soon Modal
      </Button>
      <Modal
        title="Coming Soon"
        open={visible}
        onCancel={handleClose}
        footer={null}
        centered
        style={{ textAlign: 'center' }}
      >
        <div style={{ fontSize: '24px', color: '#ff4d4f' }}>
          <p>🚧</p>
          <h2>We are working on it!</h2>
          <p>This page is coming soon. Stay tuned!</p>
        </div>
      </Modal>
    </>
  );
};

export default ComingSoonModal;
