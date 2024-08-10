import Login from "../../components/Auth/login";
import withAuthLayout from "../../components/hoc/withAuthLayout";

const LoginPage = () => {
  return <Login />;
};

export default withAuthLayout(LoginPage);
