import React, { useState, useEffect } from "react";
import { App, Table, Button, Popconfirm, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import UserModal from "../components/common/UserModal";

const { Title } = Typography;

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/users";

const Users = () => {
  const { message } = App.useApp();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchUsers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_BASE, { params: { page, limit: pageSize } });
      const list = Array.isArray(data) ? data : data.users ?? data.data ?? [];
      const total = data.total ?? data.totalCount ?? list.length;
      setUsers(list);
      setPagination((prev) => ({ ...prev, current: page, pageSize, total }));
    } catch {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1, pagination.pageSize);
  }, []);

  const handleAdd = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      message.success("User deleted successfully");
      fetchUsers(pagination.current, pagination.pageSize);
    } catch {
      message.error("Failed to delete user");
    }
  };

  const handleModalSubmit = async (values) => {
    setConfirmLoading(true);
    try {
      if (selectedUser) {
        await axios.put(`${API_BASE}/${selectedUser._id}`, values);
        message.success("User updated successfully");
      } else {
        await axios.post(API_BASE, values);
        message.success("User added successfully");
      }
      setModalOpen(false);
      setSelectedUser(null);
      fetchUsers(pagination.current, pagination.pageSize);
    } catch {
      message.error(
        selectedUser ? "Failed to update user" : "Failed to add user",
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Users
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showTotal: (total) => `Total ${total} users`,
        }}
        onChange={({ current, pageSize }) => fetchUsers(current, pageSize)}
      />

      <UserModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        selectedUser={selectedUser}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

export default Users;
