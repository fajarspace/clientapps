"use client";
import { useMutation } from "@apollo/client";
import { Spinner } from "@nextui-org/react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { RegisterFormType } from "../../helpers/types";
import { REGISTER_USER } from "../../graphql/actions/auth.action";
import { RegisterSchema } from "../../helpers/schemas";

const Register = () => {
  const navigate = useNavigate();
  const [registerUserMutation] = useMutation(REGISTER_USER);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: RegisterFormType) => {
    setIsSubmitting(true);
    try {
      const response = await registerUserMutation({
        variables: {
          username: values.username,
          email: values.email,
          password: values.password,
          phone_number: parseFloat(values.phone_number),
        },
      });

      const Token = response.data.register.activation_token;
      localStorage.setItem("activation_token", Token);

      navigate(`/verification?Token=${Token}`);
      toast.success("Silahkan cek email anda untuk Aktivasi akun!");
    } catch (error: any) {
      setIsSubmitting(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="mt-36 text-center text-[25px] font-bold mb-6">
        Register
      </div>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone_number: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting: formikSubmitting, errors }) => (
          <Form className="flex flex-col lg:w-1/2 w-full gap-4 mb-4">
            <Field
              as={Input}
              variant="bordered"
              label="Username"
              name="username"
              placeholder="Enter your username"
              isInvalid={!!errors.username}
              color={errors.username ? "danger" : "primary"}
              errorMessage={errors.username}
            />

            <Field
              as={Input}
              variant="bordered"
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              isInvalid={!!errors.email}
              color={errors.email ? "danger" : "primary"}
              errorMessage={errors.email}
            />

            <Field
              as={Input}
              variant="bordered"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              isInvalid={!!errors.password}
              color={errors.password ? "danger" : "primary"}
              errorMessage={errors.password}
            />

            <Field
              as={Input}
              variant="bordered"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              isInvalid={!!errors.confirmPassword}
              color={errors.confirmPassword ? "danger" : "primary"}
              errorMessage={errors.confirmPassword}
            />

            <Field
              as={Input}
              variant="bordered"
              label="Phone Number"
              name="phone_number"
              type="text"
              placeholder="Enter your phone number"
              isInvalid={!!errors.phone_number}
              color={errors.phone_number ? "danger" : "primary"}
              errorMessage={errors.phone_number}
            />

            <Button
              type="submit"
              disabled={formikSubmitting || isSubmitting}
              color="primary"
            >
              {isSubmitting ? <Spinner size="sm" color="white" /> : "Register"}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="mb-5 font-light text-slate-400 mt-4 text-sm z-[99999]">
        Already have an account?{" "}
        <Link to="/login" className="font-bold">
          Login here
        </Link>
      </div>
    </>
  );
};

export default Register;
