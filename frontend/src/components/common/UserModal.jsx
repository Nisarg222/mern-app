import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const UserModal = ({ open, onClose, onSubmit, selectedUser, confirmLoading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (selectedUser) {
        form.setFieldsValue({ name: selectedUser.name, email: selectedUser.email });
      } else {
        form.resetFields();
      }
    }
  }, [open, selectedUser, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={selectedUser ? "Edit User" : "Add User"}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={selectedUser ? "Update" : "Add"}
      confirmLoading={confirmLoading}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter an email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
