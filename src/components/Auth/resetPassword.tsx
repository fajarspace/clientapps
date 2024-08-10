"use client";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@nextui-org/button";
import { Input, Spinner, Image } from "@nextui-org/react";
import { RESET_PASSWORD } from "../../graphql/actions/auth.action";
import { ResetPasswordFormType } from "../../helpers/types";
import { ResetPasswordSchema } from "../../helpers/schemas";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ResetPassword = ({ activationToken }: { activationToken: string }) => {
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [isSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (
    values: ResetPasswordFormType,
    { resetForm }: any
  ) => {
    try {
      await resetPassword({
        variables: {
          password: values.password,
          activationToken: activationToken,
        },
      });
      toast.success("Password Updated Successfully!");

      // Delay for 2 seconds before redirecting to login
      setTimeout(() => {
        resetForm();
        navigate("/login"); // Redirect user to login page
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="fixed left-0 right-0 bottom-0 top-0 z-0">
          <Image
            className="w-full h-full"
            src="https://nextui.org/gradients/docs-right.png"
            alt="gradient"
          />
        </div>
        <div className=" shadow-lg rounded-lg p-8 w-full max-w-lg">
          <div className="text-center text-2xl font-bold mb-6">
            Reset Your Password
          </div>

          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting: formikSubmitting, errors }) => (
              <Form className="flex flex-col gap-4">
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  variant="bordered"
                  isInvalid={errors.password}
                  color={errors.password ? "danger" : "primary"}
                  errorMessage={errors.password}
                  className="border-gray-300"
                />

                <Field
                  as={Input}
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  variant="bordered"
                  isInvalid={errors.confirmPassword}
                  color={errors.confirmPassword ? "danger" : "primary"}
                  errorMessage={errors.confirmPassword}
                  className="border-gray-300"
                />

                <Button
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || formikSubmitting}
                  className="mt-4"
                >
                  {isSubmitting || formikSubmitting ? (
                    <Spinner size="sm" color="white" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
