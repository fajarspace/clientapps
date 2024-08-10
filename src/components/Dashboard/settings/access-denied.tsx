import { InfoCircleOutlined } from "@ant-design/icons";

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="bg-white dark:bg-default-50 p-8 rounded-lg shadow-lg max-w-md text-center">
        <div className="mb-4">
          <InfoCircleOutlined className="text-red-500 text-5xl" />
        </div>
        <h2 className="text-2xl font-semibold text-red-500 mb-2">
          Access Denied
        </h2>
        <p className="text-gray-500 mb-4">
          You do not have permission to view this page.
        </p>
        <p className="text-gray-500">
          Please contact your administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
