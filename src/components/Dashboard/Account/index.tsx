import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Table, Input, Button, Dropdown, Menu, Space, Spin, Modal } from "antd";
import {
  EditOutlined,
  DownOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  GET_ALL_USERS,
  UPDATE_USER,
  DELETE_USER,
} from "../../../graphql/actions/auth.action";
import { toast, ToastContainer } from "react-toastify";

const { confirm } = Modal;

const AccountUser: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState({
    username: "",
    email: "",
    role: "",
    phone_number: "",
  });
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const roles = ["Admin", "User", "Prodi"];

  useEffect(() => {
    if (data && data.getUsers) {
      setFilteredData(data.getUsers);
    }
  }, [data]);

  useEffect(() => {
    if (editingUserId && data && data.getUsers) {
      const user = data.getUsers.find((user: any) => user.id === editingUserId);
      if (user) {
        setEditedData({
          username: user.username,
          email: user.email,
          role: user.role,
          phone_number: user.phone_number,
        });
      }
    }
  }, [editingUserId, data]);

  const handleEditToggle = (userId: string) => {
    setEditingUserId(editingUserId === userId ? null : userId);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateUser = async (userId: string) => {
    try {
      const input = {
        ...editedData,
        phone_number: parseFloat(editedData.phone_number),
      };

      await updateUser({
        variables: {
          id: userId,
          updateUserInput: input,
        },
      });
      toast.success("User updated successfully!");
      setEditingUserId(null);
    } catch (error: any) {
      toast.error(`Failed to update user: ${error.message}`);
    }
  };

  const handleDeleteUser = (userId: string) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        try {
          await deleteUser({
            variables: { id: userId },
          });
          toast.success("User deleted successfully!");
          setFilteredData(filteredData.filter((user) => user.id !== userId));
        } catch (error: any) {
          toast.error(`Failed to delete user: ${error.message}`);
        }
      },
      onCancel() {},
    });
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (!value) {
      setFilteredData(data.getUsers);
    } else {
      const filtered = data.getUsers.filter(
        (user: any) =>
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          user.role.toLowerCase().includes(value.toLowerCase()) ||
          user.phone_number.toString().includes(value)
      );
      setFilteredData(filtered);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (loading) return <Spin size="large" />;
  if (error) return <p>Error loading users: {error.message}</p>;

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text: string, record: any) =>
        editingUserId === record.id ? (
          <Input
            value={editedData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            autoFocus
          />
        ) : (
          text
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string, record: any) =>
        editingUserId === record.id ? (
          <Input
            value={editedData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text: string, record: any) =>
        editingUserId === record.id ? (
          <Input
            value={editedData.phone_number}
            onChange={(e) => handleInputChange("phone_number", e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text: string, record: any) =>
        editingUserId === record.id ? (
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => handleInputChange("role", key)}>
                {roles.map((role) => (
                  <Menu.Item key={role}>{role}</Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button>
              {editedData.role || "Select Role"} <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          text
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) =>
        editingUserId === record.id ? (
          <Space>
            <Button onClick={() => handleUpdateUser(record.id)}>Save</Button>
            <Button onClick={() => setEditingUserId(null)}>Cancel</Button>
          </Space>
        ) : (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditToggle(record.id)}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUser(record.id)}
              danger
            />
          </Space>
        ),
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="py-5">
        <h2 className="text-2xl font-medium">User Management</h2>
      </div>
      <ToastContainer />
      <Input
        className="w-48"
        placeholder="Search by username, email, phone number, or role"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          onChange: handlePageChange,
        }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default AccountUser;
