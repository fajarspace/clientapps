import { InfoCircleOutlined } from "@ant-design/icons";

const SubmissionClosed = () => {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="bg-white dark:bg-default-50 p-8 rounded-lg shadow-lg max-w-md text-center">
        <div className="mb-4">
          <InfoCircleOutlined className="text-red-500 text-5xl" />
        </div>
        <h2 className="text-2xl font-semibold text-red-500 mb-2">
          Submissions Closed
        </h2>
        <p className="text-gray-500 mb-4">
          Unfortunately, the submission period for research proposals is
          currently closed.
        </p>
        <p className="text-gray-500">
          Stay tuned for updates on the next submission window.
        </p>
      </div>
    </div>
  );
};

export default SubmissionClosed;
