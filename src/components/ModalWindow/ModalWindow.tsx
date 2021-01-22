import { Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';

interface ModalTypes {
  onChange: any;
  visible: boolean;
  onOk: () => any;
  onCancel: () => any;
  title: string;
}

const ModalWindow = ({ title, onChange, visible, onOk, onCancel }: ModalTypes) => {
  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      <Input onChange={onChange} placeholder="Enter title" />
    </Modal>
  );
};

export default ModalWindow;
