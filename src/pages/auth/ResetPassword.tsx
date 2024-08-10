import React from "react";
import ResetPassword from "../../components/Auth/resetPassword";

const ResetPasswordPage: React.FC = () => {
  const getSearchParams = () => {
    const params = new URLSearchParams(window.location.search);
    const result: { [key: string]: string | string[] | undefined } = {};
    params.forEach((value, key) => {
      if (result[key]) {
        if (Array.isArray(result[key])) {
          (result[key] as string[]).push(value);
        } else {
          result[key] = [result[key] as string, value];
        }
      } else {
        result[key] = value;
      }
    });
    return result;
  };

  const searchParams = getSearchParams();
  const activationToken = Array.isArray(searchParams["verify"])
    ? searchParams["verify"][0]
    : searchParams["verify"] ?? "";

  return <ResetPassword activationToken={activationToken as string} />;
};

export default ResetPasswordPage;
