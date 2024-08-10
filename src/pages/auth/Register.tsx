import Register from "../../components/Auth/register";
import withAuthLayout from "../../components/hoc/withAuthLayout";

const RegisterPage = () => {
  return <Register />;
};

export default withAuthLayout(RegisterPage);
