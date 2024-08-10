import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/react";
import { LOGIN_USER } from "../../graphql/actions/auth.action";
import { LoginFormType } from "../../helpers/types";
import { LoginSchema } from "../../helpers/schemas";

const Login = () => {
  // const Navigate = useNavigate();
  const [login] = useMutation(LOGIN_USER);
  const [show] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: LoginFormType, { resetForm }: any) => {
    setIsSubmitting(true);
    try {
      const response = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      if (response.data.Login.user) {
        toast.success("Login Successful!");
        Cookies.set("refresh_token", response.data.Login.refreshToken);
        Cookies.set("access_token", response.data.Login.accessToken);
        resetForm();
        window.location.reload();
        // Navigate("/dashboard");
        resetForm();
        // Navigate("/dashboard");
      } else {
        toast.error(response.data.Login.error.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-36 text-center text-[25px] font-bold mb-6">Login</div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting: formikSubmitting, errors }) => (
          <Form
            className="flex flex-col lg:w-1/2 w-full gap-4 mb-4"
            method="post"
          >
            <div>
              <Field
                as={Input}
                variant="bordered"
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                isInvalid={errors.email}
                color={errors.email ? "danger" : "primary"}
                errorMessage={errors.email}
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-500 mt-1"
              />
            </div>
            <div>
              <Field
                as={Input}
                variant="bordered"
                label="Password"
                name="password"
                type={!show ? "password" : "text"}
                placeholder="Enter your password"
                isInvalid={errors.password}
                color={errors.password ? "danger" : "primary"}
                errorMessage={errors.password}
              />
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-500"
              />
            </div>

            <Button
              type="submit"
              disabled={formikSubmitting || isSubmitting}
              // variant="flat"
              color="primary"
            >
              {isSubmitting || formikSubmitting ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="font-light text-slate-400 mt-4 text-sm z-[99999]">
        <a href="/forgot-password" className="font-bold">
          Forgot password
        </a>
      </div>

      <div className="font-light text-slate-400 mt-4 mb-5 text-sm z-[99999]">
        Don&apos;t have an account?{" "}
        <a href="/register" className="font-bold">
          Register here
        </a>
      </div>
    </>
  );
};

export default Login;
