import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Spinner } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import { Card, CardBody } from "@nextui-org/card";
import { Input, Tooltip } from "antd";
import { EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  UPDATE_USER,
  UPDATE_PASSWORD,
} from "../../../../graphql/actions/auth.action";
import { useUser } from "../../../hooks/useUser";

const UpdateAkun: React.FC = () => {
  const { user, loading: userLoading } = useUser();
  const [updateProfile] = useMutation(UPDATE_USER);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  const [username, setUsername] = useState(user?.username || "");
  const [role, setRole] = useState(user?.role || "");
  const [email] = useState(user?.email || "");
  const [phone_number, setPhoneNumber] = useState(user?.phone_number || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRole(user.role);
      setPhoneNumber(user.phone_number);
    }
  }, [user]);

  const handleFieldUpdate = async (field: string, value: string) => {
    if (field === "username") setUsername(value);
    if (field === "phone_number") setPhoneNumber(value);

    const input: any = {
      id: user?.id,
      updateUserInput: {
        email,
        username,
        phone_number: parseFloat(phone_number),
      },
    };

    try {
      await updateProfile({
        variables: input,
      });
      toast.success(`${field} updated successfully!`);
    } catch (error: any) {
      toast.error(`Failed to update ${field}: ` + error.message);
    } finally {
      setEditingField(null);
    }
  };

  const handleBlur = (field: string, value: string) => {
    if (editingField) {
      handleFieldUpdate(field, value);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: string,
    value: string
  ) => {
    if (event.key === "Enter") {
      handleFieldUpdate(field, value);
    }
  };

  const toggleEditing = (field: string) => {
    setEditingField(editingField === field ? null : field);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await updatePassword({
        variables: {
          id: user?.id,
          updatePasswordInput: {
            currentPassword,
            newPassword,
          },
        },
      });
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      toast.error(`Failed to update password: ${error}`);
    }
  };
  if (userLoading) return <Spinner size="lg" color="primary" />;

  return (
    <div className="container flex justify-center py-10">
      <ToastContainer />
      <Card className="w-full max-w-lg shadow-md rounded-lg">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <div className="flex items-center w-2/3">
                {editingField === "username" ? (
                  <Input
                    id="username"
                    size="large"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => handleBlur("username", username)}
                    onKeyDown={(e) => handleKeyDown(e, "username", username)}
                    autoFocus
                    className="w-full"
                  />
                ) : (
                  <span className="w-full">{username}</span>
                )}
                <EditOutlined
                  className="ml-2 cursor-pointer"
                  onClick={() => toggleEditing("username")}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <div className="flex items-center w-2/3">
                <span id="email" className="w-full text-gray-400">
                  {email}
                </span>
                <Tooltip title="Email cannot be changed">
                  <QuestionCircleOutlined className="ml-2" />
                </Tooltip>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="role" className="font-semibold">
                Role
              </label>
              <div className="flex items-center w-2/3">
                <span id="role" className="w-full text-gray-400">
                  {role}
                </span>
                <Tooltip title="Role cannot be changed">
                  <QuestionCircleOutlined className="ml-2" />
                </Tooltip>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="phone_number" className="font-semibold">
                Phone Number
              </label>
              <div className="flex items-center w-2/3">
                {editingField === "phone_number" ? (
                  <Input
                    id="phone_number"
                    size="large"
                    type="text"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onBlur={() => handleBlur("phone_number", phone_number)}
                    onKeyDown={(e) =>
                      handleKeyDown(e, "phone_number", phone_number)
                    }
                    autoFocus
                    className="w-full"
                  />
                ) : (
                  <span className="w-full">{phone_number}</span>
                )}
                <EditOutlined
                  className="ml-2 cursor-pointer"
                  onClick={() => toggleEditing("phone_number")}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="text-blue-600"
                >
                  Change Password
                </button>
              </div>
              {showPasswordForm && (
                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="currentPassword" className="font-semibold">
                      Current Password
                    </label>
                    <div className="flex items-center w-2/3">
                      <Input
                        id="currentPassword"
                        size="large"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="newPassword" className="font-semibold">
                      New Password
                    </label>
                    <div className="flex items-center w-2/3">
                      <Input
                        id="newPassword"
                        size="large"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmNewPassword"
                      className="font-semibold"
                    >
                      Confirm New Password
                    </label>
                    <div className="flex items-center w-2/3">
                      <Input
                        id="confirmNewPassword"
                        size="large"
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePasswordChange}
                      className="w-full mt-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateAkun;
