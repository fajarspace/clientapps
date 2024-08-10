"use client";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Image, Link, Spinner } from "@nextui-org/react";
import { FORGOT_PASSWORD } from "../../graphql/actions/auth.action";
import { ForgotPasswordFormType } from "../../helpers/types";
import { ForgotPasswordSchema } from "../../helpers/schemas";
import { useState } from "react";

const ForgotPassword = () => {
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (
    values: ForgotPasswordFormType,
    { resetForm }: any
  ) => {
    setIsSubmitting(true);
    try {
      await forgotPassword({
        variables: {
          email: values.email,
        },
      });
      toast.success("Please check your email to reset your password!");
      resetForm();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <ToastContainer />
      <div className="fixed left-0 right-0 bottom-0 top-0 z-0">
        <Image
          className="w-full h-full"
          src="https://nextui.org/gradients/docs-right.png"
          alt="gradient"
        />
      </div>
      <div className="mt-36 text-center text-2xl font-bold mb-6">
        Forgot Password
      </div>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={onSubmit}
      >
        {({ errors }) => (
          <Form className="flex flex-col items-center w-full max-w-md gap-4">
            <div className="w-full">
              <Field
                as={Input}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                className={`w-full ${errors.email ? "border-red-500" : ""}`}
                isInvalid={Boolean(errors.email)}
                color={errors.email ? "danger" : "primary"}
                errorMessage={errors.email && "Please enter a valid email"}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              color="primary"
              className="w-full bg-blue-800 hover:bg-blue-700"
            >
              {isSubmitting || loading ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-4 text-sm text-gray-500">
        Remember your password?{" "}
        <Link href="/login" className="font-bold text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
